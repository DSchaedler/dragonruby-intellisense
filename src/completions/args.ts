import * as vscode from 'vscode';

export function getArgsCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ['tick_count',         'tick_count',                                      "How many frames the game has run."],
        ['pixel_array',        'pixel_array(${1:NAME})',                          "Get a named image you can draw pixel by pixel."],
        ['render_target',      'render_target(${1:NAME})',                        "Draw into a reusable off-screen image."],
        ['clear_pixel_arrays', 'clear_pixel_arrays',                              "Remove all pixel-by-pixel images."],
        ['solids',             'solids',                                          "Draw filled rectangles."],
        ['static_solids',      'static_solids',                                   "Draw rectangles that stay until cleared."],
        ['sprites',            'sprites',                                         "Draw images from your game files."],
        ['static_sprites',     'static_sprites',                                  "Draw images that stay until cleared."],
        ['labels',             'labels',                                          "Draw text on the screen."],
        ['static_labels',      'static_labels',                                   "Draw text that stays until cleared."],
        ['lines',              'lines',                                           "Draw straight lines."],
        ['static_lines',       'static_lines',                                    "Draw lines that stay until cleared."],
        ['borders',            'borders',                                         "Draw rectangle outlines."],
        ['static_borders',     'static_borders',                                  "Draw outlines that stay until cleared."],
        ['primitives',         'primitives',                                      "Draw shapes, text, and images."],
        ['static_primitives',  'static_primitives',                               "Draw items that stay until cleared."],
        ['render_targets',     'render_targets',                                  "Images the game can draw into."],
        ['click',              'click',                                           "Position of the latest mouse click."],
        ['click_at',           'click_at',                                        "Frame when the latest mouse click happened."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return [
        ...snippets,
        new vscode.CompletionItem('outputs', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('inputs', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('state', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('geometry', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('gtk', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('audio', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('grid', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('layout', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('easing', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('events', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('cvars', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('pixel_arrays', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('temp_state', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('passes', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('wizards', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('recording', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('runtime', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('string', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('keyboard', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('mouse', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_one', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_two', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_three', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_four', vscode.CompletionItemKind.Property)
    ];
}