import * as vscode from 'vscode';

export function getStringCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ['wrapped_lines', 'wrapped_lines(${1:TEXT}, ${2:MAX_LENGTH})', 'Wrap text into lines of a maximum length.'],
        ['wrapped_lines_character_boundary', 'wrapped_lines_character_boundary(${1:TEXT}, ${2:MAX_LENGTH})', 'Wrap text while splitting long words by character.'],
        ['wrapped_lines_word_boundary', 'wrapped_lines_word_boundary(${1:TEXT}, ${2:MAX_LENGTH})', 'Wrap text at word boundaries.']
    ];

    return snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });
}
