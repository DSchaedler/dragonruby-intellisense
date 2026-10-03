import * as vscode from 'vscode';

export function getEventsCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["resize_occurred",     "resize_occurred",     "Whether the game window changed size."],
        ["orientation_changed", "orientation_changed", "Whether the screen turned this frame."],
        ["raw",                 "raw",                 "Input events received this frame."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
