import * as vscode from 'vscode';

export function getStateCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["tick_count",                "tick_count",                "How many frames the game has run."],
        ["entity_id",                 "entity_id",                 "Unique number for this game object."],
        ["entity_type",               "entity_type",               "Kind of game object."],
        ["created_at",                "created_at",                "Frame when this object was made."],
        ["created_at_elapsed",        "created_at_elapsed",        "Frames since this object was made."],
        ["global_created_at",         "global_created_at",         "Overall frame when this object was made."],
        ["global_created_at_elapsed", "global_created_at_elapsed", "Overall frames since this object was made."],
        ["as_hash",                   "as_hash",                   "Get this object\u2019s values as a collection."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
