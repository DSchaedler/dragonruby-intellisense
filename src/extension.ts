// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerApiScanner } from './apiScanner';

// Create a reference to each subfile which is providing completions.
import { getArgsCompletions } from './completions/args';
import { getArrayCompletions } from './completions/array';
import { getAudioCompletions } from './completions/audio';
import { getBlockCompletions } from './completions/blocks';
import { getCvarsCompletions } from './completions/cvars';
import { getControllerFourCompletions } from './completions/inputs.controller_four';
import { getControllerOneCompletions } from './completions/inputs.controller_one';
import { getControllerThreeCompletions } from './completions/inputs.controller_three';
import { getControllerTwoCompletions } from './completions/inputs.controller_two';
import { getEasingCompletions } from './completions/easing';
import { getEventsCompletions } from './completions/events';
import { getGeometryCompletions } from './completions/geometry';
import { getGridCompletions } from './completions/grid';
import { getGtkClassMacrosCompletions } from './completions/gtk.class_macros';
import { getGtkCompletions } from './completions/gtk';
import { getGtkMethodsCompletions } from './completions/gtk.methods';
import { getInputsCompletions } from './completions/inputs';
import { getKeyboardCompletions } from './completions/inputs.keyboard';
import { getMouseCompletions } from './completions/inputs.mouse';
import { getLayoutCompletions } from './completions/layout';
import { getNumericCompletions } from './completions/numeric';
import { getOutputsCompletions } from './completions/outputs';
import { getPixelArrayCompletions, getPixelArraysCompletions } from './completions/pixel_arrays';
import { getRecordingCompletions } from './completions/recording';
import { getStateCompletions } from './completions/state';
import { getStringCompletions } from './completions/string';
import { getTouchCompletions } from './completions/inputs.touch';
import { getIosWizardCompletions, getItchWizardCompletions, getWizardsCompletions } from './completions/wizards';
import { getZlibCompletions } from './completions/zlib';

const completionRoutes: Record<string, () => vscode.CompletionItem[]> = {
	'args': getArgsCompletions,
	'args.outputs': getOutputsCompletions,
	'args.render_target': getOutputsCompletions,
	'args.render_targets': getArrayCompletions,
	'args.inputs': getInputsCompletions,
	'args.inputs.controller_one': getControllerOneCompletions,
	'args.inputs.controller_two': getControllerTwoCompletions,
	'args.inputs.controller_three': getControllerThreeCompletions,
	'args.inputs.controller_four': getControllerFourCompletions,
	'args.keyboard': getKeyboardCompletions,
	'args.mouse': getMouseCompletions,
	'args.touch': getTouchCompletions,
	'args.controller_one': getControllerOneCompletions,
	'args.controller_two': getControllerTwoCompletions,
	'args.controller_three': getControllerThreeCompletions,
	'args.controller_four': getControllerFourCompletions,
	'args.inputs.keyboard': getKeyboardCompletions,
	'args.inputs.mouse': getMouseCompletions,
	'args.inputs.touch': getTouchCompletions,
	'args.geometry': getGeometryCompletions,
	'args.state': getStateCompletions,
	'args.gtk': getGtkCompletions,
	'args.runtime': getGtkCompletions,
	'args.audio': getAudioCompletions,
	'args.grid': getGridCompletions,
	'args.layout': getLayoutCompletions,
	'args.easing': getEasingCompletions,
	'args.events': getEventsCompletions,
	'args.cvars': getCvarsCompletions,
	'args.pixel_arrays': getPixelArraysCompletions,
	'args.recording': getRecordingCompletions,
	'args.wizards': getWizardsCompletions,
	'args.wizards.ios': getIosWizardCompletions,
	'args.wizards.itch': getItchWizardCompletions,
	'args.string': getStringCompletions,
	'args.temp_state': getStateCompletions,
	'args.passes': getArrayCompletions,
	'DR': getGtkCompletions,
	'$gtk': getGtkCompletions,
	'Grid': getGridCompletions,
	'Layout': getLayoutCompletions,
	'Easing': getEasingCompletions,
	'Geometry': getGeometryCompletions,
	'Zlib': getZlibCompletions,
	'Array': getArrayCompletions,
	'Numeric': getNumericCompletions
};

export function resolveCompletionRoute(linePrefix: string): string | undefined {
	const trimmed = linePrefix.trimEnd();
	if (/\d+\.$/.test(trimmed)) {
		return 'Numeric';
	}
	if (/^(?:\[[^\]\n]*\]|\w+\])\.$/.test(trimmed)) {
		return 'Array';
	}

	const chain = trimmed.match(
		/([A-Za-z_$][\w$]*(?:\([^()\n]*\)|\[[^\]\n]*\])?(?:\s*\.\s*[A-Za-z_$][\w$]*(?:\([^()\n]*\)|\[[^\]\n]*\])?)*)\s*\.$/
	);
	if (!chain) {
		return undefined;
	}

	const normalized = chain[1]
		.replace(/\s*(?:\([^()\n]*\)|\[[^\]\n]*\])/g, '')
		.replace(/\s*\.\s*/g, '.')
		.trim();
	if (normalized === 'args.pixel_array') {
		return 'args.pixel_array()';
	}

	const routeNames = Object.keys(completionRoutes).sort((a, b) => b.length - a.length);
	return routeNames.find(route => normalized === route || normalized.startsWith(`${route}.`));
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const knownApiLabels = new Set<string>();
	const knownApiCompletionSources = [
		...Object.values(completionRoutes),
		getArrayCompletions,
		getNumericCompletions,
		getGtkMethodsCompletions,
		getGtkClassMacrosCompletions,
		getBlockCompletions,
		getPixelArrayCompletions
	];
	for (const getCompletions of knownApiCompletionSources) {
		for (const item of getCompletions()) {
			knownApiLabels.add(typeof item.label === 'string' ? item.label : item.label.label);
		}
	}
	const getScannedApiCompletions = registerApiScanner(context, knownApiLabels);

	// Piggyback on the native language completion for Ruby.
	const provider = vscode.languages.registerCompletionItemProvider(
		'ruby',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const linePrefix = document.lineAt(position).text.substring(0, position.character);
				const route = resolveCompletionRoute(linePrefix);
				if (route === 'Numeric') {
					return getNumericCompletions();
				}
				if (route === 'Array') {
					return getArrayCompletions();
				}
				if (route === 'args.pixel_array()') {
					return getPixelArrayCompletions();
				}

				if (!route) {
					if (linePrefix.endsWith('.')) {
						return undefined;
					}

					const completions = [
						...getScannedApiCompletions(document),
						...getArrayCompletions(),
						...getNumericCompletions(),
						...getGtkMethodsCompletions(),
						...getGtkClassMacrosCompletions(),
						...getBlockCompletions()
					];
					const seenLabels = new Set<string>();

					return completions.filter(item => {
						const label = typeof item.label === 'string' ? item.label : item.label.label;
						if (seenLabels.has(label)) {
							return false;
						}

						seenLabels.add(label);
						return true;
					});
				}

				const items = [...(completionRoutes[route]?.() ?? []), ...getScannedApiCompletions(document, route)];
				const seenLabels = new Set<string>();
				return items.filter(item => {
					const label = typeof item.label === 'string' ? item.label : item.label.label;
					if (seenLabels.has(label)) {
						return false;
					}
					seenLabels.add(label);
					return true;
				});
			}
		},
		'.' // Trigger on dot
	);

	context.subscriptions.push(provider);

	const completionItems = [
		...knownApiCompletionSources.flatMap(getCompletions => getCompletions()),
		...Object.values(completionRoutes).flatMap(getCompletions => getCompletions())
	];
	const completionByLabel = new Map<string, vscode.CompletionItem>();
	for (const item of completionItems) {
		const label = typeof item.label === 'string' ? item.label : item.label.label;
		if (!completionByLabel.has(label)) {
			completionByLabel.set(label, item);
		}
	}

	context.subscriptions.push(vscode.languages.registerHoverProvider('ruby', {
		provideHover(document, position) {
			const range = document.getWordRangeAtPosition(position, /[A-Za-z_][\w!?=]*/);
			if (!range) {
				return undefined;
			}
			const label = document.getText(range);
			const item = completionByLabel.get(label);
			if (!item?.detail) {
				return undefined;
			}
			return new vscode.Hover(new vscode.MarkdownString(`**${label}**\n\n${item.detail}`), range);
		}
	}));

	context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(
		'ruby',
		{
			provideSignatureHelp(document, position) {
				const beforeCursor = document.lineAt(position).text.substring(0, position.character);
				const call = beforeCursor.match(/([A-Za-z_][\w!?=]*)\s*\(([^()]*)$/);
				if (!call) {
					return undefined;
				}
				const item = completionByLabel.get(call[1]);
				if (!item) {
					return undefined;
				}
				const detail = item.detail ?? '';
				const signature = new vscode.SignatureInformation(
					buildSignatureLabel(call[1], item.insertText),
					detail
				);
				const parameters = [...signature.label.matchAll(/[,(]\s*([^(),]+)\s*(?=[,)])/g)];
				signature.parameters = parameters.map(match => new vscode.ParameterInformation(match[1].trim()));
				const help = new vscode.SignatureHelp();
				help.signatures = [signature];
				help.activeSignature = 0;
				help.activeParameter = Math.min(call[2].split(',').length - 1, Math.max(signature.parameters.length - 1, 0));
				return help;
			}
		},
		'(',
		','
	));

}

export function buildSignatureLabel(label: string, insertText: vscode.CompletionItem['insertText']): string {
	const snippet = insertText instanceof vscode.SnippetString ? insertText.value : label;
	const placeholders = [...snippet.matchAll(/\$\{\d+:([^}]+)\}/g)].map(match => match[1]);
	return placeholders.length ? `${label}(${placeholders.join(', ')})` : `${label}(...)`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
