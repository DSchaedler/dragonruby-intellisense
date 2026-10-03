import * as vscode from 'vscode';

export function getAudioCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["volume", "volume", "Set the sound level for the whole game, from 0 (quiet) to 1 (full)."],
        ["sync!",  "sync!",  "Apply audio changes right away."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
