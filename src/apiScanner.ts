import * as path from 'path';
import * as vscode from 'vscode';

const scanChoiceKey = 'dragonrubyIntellisense.apiScanChoice';
const scanPerformedKey = 'dragonrubyIntellisense.apiScanPerformed';
const scanResultsKey = 'dragonrubyIntellisense.apiScanResults';
const scanCommand = 'dragonruby-intellisense.scanApi';

const maxDirectories = 250;
const maxFiles = 1000;
const maxFileSize = 256 * 1024;
const maxTotalBytes = 5 * 1024 * 1024;
const maxResults = 1500;
const ignoredDirectories = new Set([
	'.git',
	'.vscode',
	'node_modules',
	'vendor',
	'build',
	'target',
	'cache'
]);
const supportedExtensions = new Set(['.md', '.mdx', '.markdown', '.rb']);

interface ScanResult {
	entries: ApiEntry[];
	filesScanned: number;
	wasLimited: boolean;
}

export interface ApiEntry {
	name: string;
	namespace?: string;
	signature?: string;
	detail?: string;
}

export function extractApiEntries(contents: string, extension: string): ApiEntry[] {
	const entries = new Map<string, ApiEntry>();
	if (extension === '.rb') {
		const definitionPattern = /^\s*def\s+(?:self\.)?([a-z_]\w*[!?=]?)/gm;
		for (const match of contents.matchAll(definitionPattern)) {
			entries.set(match[1], { name: match[1] });
		}
		return [...entries.values()];
	}

	const qualifiedCallPattern = /(?:`)?((?:args|GTK|Geometry|Grid|Layout|Easing|Zlib|DR|\$gtk)(?:\.[A-Za-z_$][\w$]*)*)\.([a-z_]\w*[!?]?)\s*\(([^)]*)\)/g;
	for (const match of contents.matchAll(qualifiedCallPattern)) {
		const namespace = match[1];
		const name = match[2];
		const signature = match[3].trim();
		const line = contents.slice(0, match.index).split('\n').pop()?.trim() ?? '';
		const detail = line.replace(/[`*#]/g, '').trim();
		entries.set(`${namespace}.${name}`, {
			name,
			namespace,
			signature,
			detail: detail || undefined
		});
	}

	const documentedCallPattern = /`(?:[A-Za-z_$][\w$]*(?:[.#:][A-Za-z_$][\w$]*)*[.#:])?([a-z_]\w*[!?]?)\s*\(/g;
	for (const match of contents.matchAll(documentedCallPattern)) {
		if (![...entries.values()].some(entry => entry.name === match[1])) {
			entries.set(match[1], { name: match[1] });
		}
	}

	const signaturePattern = /^\s*(?:#{1,6}\s+)?(?:[A-Za-z_$][\w$]*(?:[.#:][A-Za-z_$][\w$]*)*[.#:])?([a-z_]\w*[!?]?)\s*\(([^)]*)\)/gm;
	for (const match of contents.matchAll(signaturePattern)) {
		if (![...entries.values()].some(entry => entry.name === match[1])) {
			entries.set(match[1], { name: match[1], signature: match[2].trim() });
		}
	}

	return [...entries.values()];
}

export function extractApiNames(contents: string, extension: string): Set<string> {
	return new Set(extractApiEntries(contents, extension).map(entry => entry.name));
}

async function scanFolder(root: vscode.Uri): Promise<ScanResult> {
	const entries = new Map<string, ApiEntry>();
	const pendingDirectories = [root];
	let directoriesScanned = 0;
	let filesScanned = 0;
	let bytesScanned = 0;
	let wasLimited = false;

	while (pendingDirectories.length > 0) {
		if (directoriesScanned >= maxDirectories || filesScanned >= maxFiles || bytesScanned >= maxTotalBytes) {
			wasLimited = true;
			break;
		}

		const directory = pendingDirectories.pop()!;
		directoriesScanned++;
		const directoryEntries = await vscode.workspace.fs.readDirectory(directory);

		for (const [entryName, type] of directoryEntries) {
			if (type === vscode.FileType.Directory) {
				if (!ignoredDirectories.has(entryName)) {
					if (directoriesScanned + pendingDirectories.length < maxDirectories) {
						pendingDirectories.push(vscode.Uri.joinPath(directory, entryName));
					} else {
						wasLimited = true;
					}
				}
				continue;
			}

			if (type !== vscode.FileType.File || !supportedExtensions.has(path.extname(entryName).toLowerCase())) {
				continue;
			}

			if (!/(^|\/)(docs?|api)(\/|$)/i.test(vscode.Uri.joinPath(directory, entryName).path)) {
				continue;
			}

			if (filesScanned >= maxFiles || bytesScanned >= maxTotalBytes) {
				wasLimited = true;
				break;
			}

			const file = vscode.Uri.joinPath(directory, entryName);
			const stat = await vscode.workspace.fs.stat(file);
			if (stat.size > maxFileSize || bytesScanned + stat.size > maxTotalBytes) {
				wasLimited = true;
				continue;
			}

			const contents = Buffer.from(await vscode.workspace.fs.readFile(file)).toString('utf8');
			filesScanned++;
			bytesScanned += stat.size;

			for (const entry of extractApiEntries(contents, path.extname(entryName).toLowerCase())) {
				const key = `${entry.namespace ?? ''}.${entry.name}`;
				entries.set(key, entry);
				if (entries.size >= maxResults) {
					wasLimited = true;
					break;
				}
			}

			if (wasLimited && entries.size >= maxResults) {
				break;
			}
		}

		if (wasLimited && entries.size >= maxResults) {
			break;
		}
	}

	return {
		entries: [...entries.values()].sort((a, b) => a.name.localeCompare(b.name)),
		filesScanned,
		wasLimited
	};
}

export function registerApiScanner(
	context: vscode.ExtensionContext,
	knownApiLabels: ReadonlySet<string>
): (document: vscode.TextDocument, namespace?: string) => vscode.CompletionItem[] {
	const knownLabels = new Set(knownApiLabels);
	const getScannedApiCompletions = (document: vscode.TextDocument, namespace?: string) => {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
		if (!workspaceFolder) {
			return [];
		}

		const results = context.workspaceState.get<Record<string, ApiEntry[] | string[]>>(scanResultsKey, {});
		const stored = results[workspaceFolder.uri.toString()] ?? [];
		const entries: ApiEntry[] = stored.map(value => typeof value === 'string' ? { name: value } : value);
		return entries
			.filter(entry => namespace
				? entry.namespace === namespace
				: !knownLabels.has(entry.name))
			.map(entry => {
				const item = new vscode.CompletionItem(entry.name, vscode.CompletionItemKind.Function);
				item.insertText = entry.name;
				item.detail = entry.detail || 'Found in this workspace folder’s API documentation.';
				if (entry.signature) {
					item.documentation = new vscode.MarkdownString(`\`${entry.name}(${entry.signature})\``);
				}
				return item;
			});
	};

	const runScan = async (): Promise<void> => {
		try {
			await context.workspaceState.update(scanChoiceKey, 'accepted');
			const workspaceFolders = vscode.workspace.workspaceFolders;
			if (!workspaceFolders?.length) {
				await vscode.window.showErrorMessage('Open a project workspace before scanning for DragonRuby API calls.');
				return;
			}

			let root = workspaceFolders[0].uri;
			if (workspaceFolders.length > 1) {
				const selectedFolder = await vscode.window.showQuickPick(
					workspaceFolders.map(folder => ({
						label: folder.name,
						description: folder.uri.fsPath,
						uri: folder.uri
					})),
					{ placeHolder: 'Choose the workspace folder containing DragonRuby API documentation' }
				);
				if (!selectedFolder) {
					return;
				}
				root = selectedFolder.uri;
			}

			const result = await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: 'Scanning DragonRuby API documentation',
					cancellable: false
				},
				() => scanFolder(root)
			);
			const folderKey = root.toString();
			const scannedEntries = result.entries;
			const allResults = context.workspaceState.get<Record<string, ApiEntry[] | string[]>>(scanResultsKey, {});
			await context.workspaceState.update(scanResultsKey, {
				...allResults,
				[folderKey]: scannedEntries
			});
			const performedFolders = context.workspaceState.get<string[]>(scanPerformedKey, []);
			if (!performedFolders.includes(folderKey)) {
				performedFolders.push(folderKey);
				await context.workspaceState.update(scanPerformedKey, performedFolders);
			}

			const limitMessage = result.wasLimited ? ' The scan stopped at its lightweight scan limit.' : '';
			await vscode.window.showInformationMessage(
				`Scan complete: found ${scannedEntries.filter(entry => !knownLabels.has(entry.name)).length} API calls not already provided by the extension in ${result.filesScanned} files.${limitMessage}`
			);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			await vscode.window.showErrorMessage(`Could not scan DragonRuby API documentation: ${message}`);
		}
	};

	context.subscriptions.push(vscode.commands.registerCommand(scanCommand, runScan));

	const storedChoice = context.workspaceState.get<string>(scanChoiceKey);
	if (!storedChoice) {
		void (async () => {
			try {
				const choice = await vscode.window.showInformationMessage(
					'Would you like to scan your current project workspace for DragonRuby API calls missing from this extension?',
					'Scan Workspace',
					'Not now'
				);
				if (choice === 'Scan Workspace') {
					await runScan();
				} else if (choice === 'Not now') {
					await context.workspaceState.update(scanChoiceKey, 'declined');
				}
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				await vscode.window.showErrorMessage(`Could not ask about the DragonRuby API scan: ${message}`);
			}
		})();
	} else if (storedChoice === 'accepted') {
		const activeFolder = vscode.window.activeTextEditor
			? vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri)
			: vscode.workspace.workspaceFolders?.[0];
		const performedFolders = context.workspaceState.get<string[]>(scanPerformedKey, []);
		if (!activeFolder || !performedFolders.includes(activeFolder.uri.toString())) {
			void runScan();
		}
	}

	return getScannedApiCompletions;
}
