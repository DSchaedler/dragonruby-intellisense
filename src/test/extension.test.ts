import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('provides DragonRuby completions in Ruby files', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'ruby',
			content: 'args.'
		});
		const position = new vscode.Position(0, 5);
		const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
			'vscode.executeCompletionItemProvider',
			document.uri,
			position,
			'.'
		);

		assert.ok(completions.items.some(item => item.label === 'outputs'));
	});
});
