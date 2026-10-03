import * as vscode from 'vscode';

export function getZlibCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["compress",   "compress(${1:DATA})",   "Make text or data take up less space."],
        ["deflate",    "deflate(${1:DATA})",    "Make data take up less space using deflate."],
        ["uncompress", "uncompress(${1:DATA})", "Restore data that was made smaller."],
        ["inflate",    "inflate(${1:DATA})",    "Restore data compressed with deflate."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
