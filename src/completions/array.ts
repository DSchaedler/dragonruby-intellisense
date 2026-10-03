import * as vscode from 'vscode';

export function getArrayCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["map_2d",              "map_2d { |${1:item}| $0 }",      "Run code on each item in a grid of rows and columns."],
        ["include_any?",        "include_any?(${1:ITEMS})",       "Check whether the array contains any of the given items."],
        ["any_intersect_rect?", "any_intersect_rect?(${1:RECT})", "Check whether any rectangle overlaps the given rectangle."],
        ["reject_nil",          "reject_nil",                     "Remove empty values from the array."],
        ["reject_false",        "reject_false",                   "Remove false values from the array."],
        ["product",             "product(${1:OTHER_ARRAY})",      "Pair each item with every item in another array."],
        ["each",                "each { |${1:item}| $0 }",        "Run code once for each item."],
        ["map",                 "map { |${1:item}| $0 }",         "Make a new array by changing each item."],
        ["any?",                "any? { |${1:item}| $0 }",        "Check whether at least one item matches."],
        ["all?",                "all? { |${1:item}| $0 }",        "Check whether every item matches."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
