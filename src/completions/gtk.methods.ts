import * as vscode from 'vscode';

export function getGtkMethodsCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["def tick args",      "# DragonRuby is built on mruby, not C Ruby: https://mruby.org/docs/api/\n# Please read the engine documentation: https://docs.dragonruby.org/#/\n\ndef tick args\n  $0\nend", "Main game function, called every frame."],
        ["def boot args",      "def boot args\n  $0\nend",                                                                                                                                                    "Set up the game when it starts."],
        ["def reset args",     "def reset args\n  $0\nend",                                                                                                                                                   "Handle a game reset before state is cleared."],
        ["def did_reset args", "def did_reset args\n  $0\nend",                                                                                                                                               "Handle a game reset after state is cleared."],
        ["def shutdown args",  "def shutdown args\n  $0\nend",                                                                                                                                                "Run code when the game is closing."],
        ["Main",               "include Main",                                                                                                                                                                "Use game shortcuts without passing args around."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
