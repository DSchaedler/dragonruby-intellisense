// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Create a reference to each subfile which is providing completions.
import { getArgsCompletions } from './completions/args';
import { getOutputsCompletions } from './completions/outputs';
// import { getInputsCompletions } from './completions/inputs';

const completionRoutes: Record<string, () =>vscode.CompletionItem[]> = {
	'args': getArgsCompletions,
	'args.outputs': getOutputsCompletions,
	// 'args.inputs': getInputsCompletions,
	// '$gtk': getGtkCompletions
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Piggyback on the native language completion for Ruby.
	const provider = vscode.languages.registerCompletionItemProvider(
		'ruby',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const linePrefix = document.lineAt(position).text.substring(0, position.character);
				
				// 2. Execute the Regex
				const match = linePrefix.match(/([a-zA-Z0-9_$]+(?:\.[a-zA-Z0-9_$]+)*)\.$/);
				
				if (!match) {
						return undefined; // No valid namespace dot-chain found
				}

				// Extract the captured group (e.g., "args.outputs")
				const namespace = match[1];

				// Look up the corresponding function to import completion suggestions
				const getCompletions = completionRoutes[namespace];

				return getCompletions ? getCompletions() : undefined;

			}
		},
		'.' // Trigger on dot
	);

	context.subscriptions.push(provider);

}

// This method is called when your extension is deactivated
export function deactivate() {}
