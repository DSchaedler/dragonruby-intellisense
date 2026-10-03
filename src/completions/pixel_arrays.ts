import * as vscode from 'vscode';

export function getPixelArraysCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["keys",   "keys",                                 "Names of images made from individual pixels."],
        ["values", "values",                               "Images made from individual pixels."],
        ["each",   "each { |${1:name}, ${2:pixels}| $0 }", "Run code for each named pixel image."],
        ["clear",  "clear",                                "Remove all pixel images."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}

export function getPixelArrayCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["w",      "w",      "Pixel array width."],
        ["h",      "h",      "Pixel array height."],
        ["pixels", "pixels", "Array of ABGR pixel values."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
