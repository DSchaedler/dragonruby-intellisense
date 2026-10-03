import * as vscode from 'vscode';

export function getCvarsCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["game_metadata", "game_metadata", "Read settings from the game metadata file."],
        ["version",       "version",       "Version number set in the game settings."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
