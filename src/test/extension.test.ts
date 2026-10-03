import * as assert from 'assert';
import { extractApiEntries, extractApiNames } from '../apiScanner';
import { buildSignatureLabel, resolveCompletionRoute } from '../extension';
import { getGeometryCompletions } from '../completions/geometry';
import { getGtkClassMacrosCompletions } from '../completions/gtk.class_macros';
import { getGtkCompletions } from '../completions/gtk';
import { getOutputsCompletions } from '../completions/outputs';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	suiteSetup(async () => {
		const extension = vscode.extensions.all.find(
			candidate => candidate.packageJSON.name === 'dragonruby-intellisense'
		);
		assert.ok(extension, 'DragonRuby Intellisense extension should be available in the test host.');
		await extension.activate();
	});

	test('contributes a DragonRuby run-game debug configuration', () => {
		const extension = vscode.extensions.all.find(
			candidate => candidate.packageJSON.name === 'dragonruby-intellisense'
		);
		assert.ok(extension);

		const debuggerContribution = extension.packageJSON.contributes.debuggers.find(
			(debuggerContribution: { type: string }) => debuggerContribution.type === 'node-terminal'
		);
		assert.ok(debuggerContribution);
		assert.ok(debuggerContribution.initialConfigurations.some((configuration: {
			name: string;
			type: string;
			request: string;
			command: string;
			cwd: string;
		}) => configuration.name === 'DragonRuby: Run Game' &&
			configuration.type === 'node-terminal' &&
			configuration.request === 'launch' &&
			configuration.command === '${workspaceFolder}/dragonruby' &&
			configuration.cwd === '${workspaceFolder}'));
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('finds API methods in Ruby source and documentation signatures', () => {
		const rubyNames = extractApiNames('def newly_added_api?\nend\n', '.rb');
		const documentedNames = extractApiNames('`Geometry.newly_added_api?(rect)`\n', '.md');
		const entries = extractApiEntries('`args.geometry.newly_added_api?(rect)`\n', '.md');

		assert.deepStrictEqual([...rubyNames], ['newly_added_api?']);
		assert.deepStrictEqual([...documentedNames], ['newly_added_api?']);
		assert.ok(entries.some(entry =>
			entry.name === 'newly_added_api?' &&
			entry.namespace === 'args.geometry' &&
			entry.signature === 'rect'
		));
	});

	test('resolves indexed and chained Ruby receiver expressions', () => {
		assert.strictEqual(resolveCompletionRoute('args.'), 'args');
		assert.strictEqual(resolveCompletionRoute('args.outputs[:scene].sprites.'), 'args.outputs');
		assert.strictEqual(resolveCompletionRoute('args.pixel_array(:scene).'), 'args.pixel_array()');
		assert.strictEqual(resolveCompletionRoute('args.inputs.controller_one.'), 'args.inputs.controller_one');
		assert.strictEqual(resolveCompletionRoute('unknown.receiver.'), undefined);
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

	test('offers output append templates as snippets instead of collection properties', () => {
		const completions = getOutputsCompletions();
		const byLabel = new Map(completions.map(item => [item.label, item]));
		const appendTemplates = [
			['solids', 'Hash'],
			['labels', 'Hash'],
			['sprites', 'Hash'],
			['borders', 'Hash'],
			['lines', 'Hash'],
			['primitives', 'Hash'],
			['static_solids', 'Hash'],
			['static_labels', 'Hash'],
			['static_sprites', 'Hash'],
			['static_borders', 'Hash'],
			['static_lines', 'Hash'],
			['static_primitives', 'Hash'],
			['debug', 'Hash'],
			['sounds', 'String'],
			['screenshots', 'Hash']
		];

		for (const [collection, parameter] of appendTemplates) {
			assert.strictEqual(
				byLabel.get(`${collection} << {${parameter}}`)?.kind,
				vscode.CompletionItemKind.Snippet
			);
			assert.strictEqual(byLabel.has(collection), false);
		}
		assert.strictEqual(byLabel.get('background_color = [RGB]')?.kind, vscode.CompletionItemKind.Snippet);
		assert.strictEqual(byLabel.get('clear_before_render = BOOLEAN')?.kind, vscode.CompletionItemKind.Snippet);
		assert.strictEqual(byLabel.get('shader_path = PATH')?.kind, vscode.CompletionItemKind.Snippet);
		assert.strictEqual(byLabel.get('shader_uniforms = [HASH]')?.kind, vscode.CompletionItemKind.Snippet);
		assert.strictEqual(byLabel.has('shader'), false);
	});

	test('includes editable values for parameterized API snippets', () => {
		const completionGroups = [
			getGeometryCompletions(),
			getGtkClassMacrosCompletions(),
			getGtkCompletions()
		];
		const snippets = new Map(completionGroups.flat().map(item => [item.label, item.insertText]));
		const expectedPlaceholders = new Map([
			['line_rise_run', '${1:LINE_PRIMITIVE}'],
			['attr', '${1:ATTRIBUTE}'],
			['write_file_root', '${1:PATH}, ${2:TEXT}'],
			['append_file_root', '${1:PATH}, ${2:TEXT}'],
			['start_server!', 'port: ${1:9001}, enable_in_prod: ${2:false}'],
			['reset_and_replay', '${1:FILE_OPTIONAL}, speed: ${2:1}'],
			['stop_recording', '${1:PATH}'],
			['start_replay', '${1:PATH}']
		]);

		for (const [label, placeholder] of expectedPlaceholders) {
			const insertText = snippets.get(label);
			assert.ok(insertText instanceof vscode.SnippetString, `${label} should insert a snippet.`);
			assert.ok(insertText.value.includes(placeholder), `${label} should include ${placeholder}.`);
		}
	});

	test('routes completions to each DragonRuby API group', async function () {
		this.timeout(15000);
		const cases = [
			['args.outputs.', 'borders << {Hash}'],
			['args.inputs.', 'keyboard'],
			['args.inputs.keyboard.', 'key_down'],
			['args.inputs.controller_one.', 'left_analog_active?'],
			['args.keyboard.', 'key_down'],
			['args.mouse.', 'inside_rect?'],
			['args.controller_one.', 'left_analog_active?'],
			['args.inputs.mouse.', 'inside_rect?'],
			['args.inputs.touch.', 'finger_left'],
			['args.geometry.', 'perlin_noise'],
			['args.state.', 'tick_count'],
			['args.gtk.', 'queue_sound'],
			['args.audio.', 'volume'],
			['args.events.', 'orientation_changed'],
			['args.grid.', 'orientation'],
			['args.layout.', 'rect'],
			['args.easing.', 'mix'],
			['args.cvars.', 'game_metadata'],
			['args.pixel_arrays.', 'keys'],
			['args.temp_state.', 'entity_id'],
			['args.passes.', 'map_2d'],
			['args.recording.', 'is_recording?'],
			['args.string.', 'wrapped_lines'],
			['args.wizards.', 'ios'],
			['args.wizards.ios.', 'reset_simulators'],
			['args.render_target(:scene).', 'background_color = [RGB]'],
			['DR.', 'set_window_size'],
			['Grid.', 'origin_center!'],
			['Layout.', 'rect'],
			['Easing.', 'smooth_step'],
			['Geometry.', 'perlin_noise'],
			['Zlib.', 'compress'],
			['5.', 'frame'],
			['[1, 2].', 'map_2d'],
			['args.pixel_array(:image).', 'pixels'],
			['args.outputs[:scene].sprites.', 'sprites << {Hash}']
		];

		for (const [content, expectedLabel] of cases) {
			const document = await vscode.workspace.openTextDocument({
				language: 'ruby',
				content
			});

			const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
				'vscode.executeCompletionItemProvider',
				document.uri,
				new vscode.Position(0, content.length),
				'.'
			);

			assert.ok(
				completions.items.some(item => item.label === expectedLabel),
				`Expected ${expectedLabel} for ${content}`
			);
		}
	});

	test('provides hover descriptions and signature help for known methods', async function () {
		this.timeout(15000);
		const content = 'args.geometry.line_rise_run(';
		const document = await vscode.workspace.openTextDocument({
			language: 'ruby',
			content
		});
		const position = new vscode.Position(0, content.length);
		const hovers = await vscode.commands.executeCommand<vscode.Hover[]>(
			'vscode.executeHoverProvider',
			document.uri,
			new vscode.Position(0, 'args.geometry.line_rise_run'.length)
		);
		const signatures = await vscode.commands.executeCommand<vscode.SignatureHelp>(
			'vscode.executeSignatureHelpProvider',
			document.uri,
			position,
			'('
		);

		assert.ok(hovers?.some(hover => hover.contents.some(content =>
			typeof content === 'string' ? content.includes('line_rise_run') : content.value.includes('line_rise_run')
		)));
		assert.ok(signatures?.signatures[0].label.includes('LINE_PRIMITIVE'));
	});

	test('builds callable signatures from snippet placeholders', () => {
		assert.strictEqual(
			buildSignatureLabel('write_file_root', new vscode.SnippetString('write_file_root(${1:PATH}, ${2:TEXT})')),
			'write_file_root(PATH, TEXT)'
		);
	});

	test('offers standalone code snippets on manual completion', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'ruby',
			content: ''
		});
		const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
			'vscode.executeCompletionItemProvider',
			document.uri,
			new vscode.Position(0, 0)
		);

		assert.ok(completions.items.some(item => item.label === 'def tick args'));
		assert.ok(completions.items.some(item => item.label === 'attr'));
		assert.ok(completions.items.some(item => item.label === 'Pause when Unfocused'));
		assert.strictEqual(completions.items.filter(item => item.label === 'map').length, 1);
	});
});
