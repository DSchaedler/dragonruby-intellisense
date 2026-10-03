import * as vscode from 'vscode';

export function getArgsCompletions(): vscode.CompletionItem[] {
    return [
        new vscode.CompletionItem('outputs', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('inputs', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('state', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('geometry', vscode.CompletionItemKind.Property)
    ];
}