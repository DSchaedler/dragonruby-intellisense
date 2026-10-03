import * as vscode from 'vscode';

export function getTouchCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["touch",        "args.inputs.touch",        "Positions and details for all active touches."],
        ["finger_left",  "args.inputs.finger_left",  "Touch position on the left side of the screen."],
        ["finger_right", "args.inputs.finger_right", "Touch position on the right side of the screen."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
