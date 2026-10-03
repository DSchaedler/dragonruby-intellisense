import * as vscode from 'vscode';

function createItems(snippetData: string[][]): vscode.CompletionItem[] {
    return snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });
}

export function getWizardsCompletions(): vscode.CompletionItem[] {
    return [
        new vscode.CompletionItem('ios', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('itch', vscode.CompletionItemKind.Property)
    ];
}

export function getIosWizardCompletions(): vscode.CompletionItem[] {
    return createItems([
        ['start', 'start env: :${1|dev,hotload,sim,prod|}', 'Build or deploy the game for iOS.'],
        ['reset_simulators', 'reset_simulators', 'Reset installed iOS simulators.'],
        ['restart', 'restart', 'Restart the most recently run iOS wizard.'],
        ['reset', 'reset', 'Reset iOS wizard progress.'],
        ['help', 'help', 'Show iOS deployment options.']
    ]);
}

export function getItchWizardCompletions(): vscode.CompletionItem[] {
    return createItems([
        ['start', 'start', 'Build and deploy the game to itch.io.'],
        ['deploy', 'deploy', 'Deploy the game to itch.io.'],
        ['restart', 'restart', 'Restart the most recently run itch.io wizard.'],
        ['reset', 'reset', 'Reset itch.io wizard progress.'],
        ['help', 'help', 'Show itch.io deployment options.']
    ]);
}
