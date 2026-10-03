import * as vscode from 'vscode';

export function getRecordingCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ['start_recording', 'start_recording seed_number: ${1:SEED}, rng_seed: ${2:RNG_SEED}', 'Begin recording game input.'],
        ['start', 'start seed_number: ${1:SEED}, rng_seed: ${2:RNG_SEED}', 'Begin recording game input.'],
        ['is_recording?', 'is_recording?', 'Check whether input is being recorded.'],
        ['stop_recording', 'stop_recording ${1:PATH}', 'Save the current recording.'],
        ['stop', 'stop ${1:PATH}', 'Stop and save recording or replay.'],
        ['cancel', 'cancel', 'Stop recording without saving.'],
        ['start_replay', 'start_replay ${1:PATH}, speed: ${2:1}', 'Replay input from a recording file.'],
        ['is_replaying?', 'is_replaying?', 'Check whether a recording is being replayed.'],
        ['stop_replay', 'stop_replay', 'Stop the current replay.'],
        ['on_replay_tick', 'on_replay_tick { |${1:args}|\\n  $0\\n}', 'Run code during each replay tick.'],
        ['on_recording_tick', 'on_recording_tick { |${1:args}|\\n  $0\\n}', 'Run code during each recording tick.'],
        ['on_replay_completed_successfully', 'on_replay_completed_successfully {\\n  $0\\n}', 'Run code after a replay completes successfully.']
    ];

    return snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });
}
