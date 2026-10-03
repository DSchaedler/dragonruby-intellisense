import * as vscode from 'vscode';
import { createCompletionItems, CompletionDefinition } from './items';

export function getOutputsCompletions(): vscode.CompletionItem[] {
    // Define all your snippets as raw data: [label, snippet, detail]
    const snippetData = [
        ['solids << [Array]', 'solids << [${1:x}, ${2:y}, ${3:w}, ${4:h}, ${5:0}, ${6:0}, ${7:0}]$0', 'Push a Solid (Array)'],
        ['solids << {Hash}', 'solids << { x: ${1:0}, y: ${2:0}, w: ${3:100}, h: ${4:100} }$0', 'Push a Solid (Hash)'],
        ['labels << [Array]', 'labels << [${1:x}, ${2:y}, "${3:text}"]$0', 'Push a Label (Array)'],
        ['sprites << [Array]', 'sprites << [${1:x}, ${2:y}, ${3:w}, ${4:h}, "${5:path}"]$0', 'Push a Sprite (Array)']
    ];

    // Convert the raw data into actual VS Code CompletionItems
    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    // Combine with your standard properties
    return [
        ...snippets,
        new vscode.CompletionItem('background_color', vscode.CompletionItemKind.Property)
    ];
}