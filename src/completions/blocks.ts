import * as vscode from 'vscode';

export function getBlockCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["Pause when Unfocused", "# if the keyboard doesn't have focus, and the game is in production mode, and it isn't the first tick\nif (!args.inputs.keyboard.has_focus &&\n    args.gtk.production &&\n    args.state.tick_count != 0)\n  args.outputs.background_color = [0, 0, 0]\n  args.outputs.labels << { x: 640,\n                           y: 360,\n                           text: 'Game Paused (click to resume).',\n                           alignment_enum: 1,\n                           r: 255, g: 255, b: 255 }\n  # consider setting all audio volume to 0.0\nelse\n  # perform your regular tick function\nend", "Pause the game when it loses focus."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
