import * as vscode from 'vscode';

export function getGtkClassMacrosCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["attr",     "attr ${1:ATTRIBUTE}", "Let a class store named values."],
        ["attr_gtk", "attr_gtk",            "Give a class shortcuts to common game features."],
        ["attr_dr",  "attr_dr",             "Give a class shortcuts to DragonRuby game features."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
