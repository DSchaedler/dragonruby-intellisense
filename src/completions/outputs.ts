import * as vscode from 'vscode';

export function getOutputsCompletions(): vscode.CompletionItem[] {
    // Define all your snippets as raw data: [label, snippet, detail]
    const snippetData = [
        ['solids << {Hash}',              'solids << { x: $1, y: $2, w: $3, h: $4 }',                                          "Draw a filled rectangle using x, y, width, and height."],
        ['labels << {Hash}',              'labels << { x: $1, y: $2, text: "$3" }',                                            "Show text at a screen position."],
        ['sprites << {Hash}',             'sprites << { x: $1, y: $2, w: $3, h: $4, path: "$5" }',                             "Show an image at a position and size."],
        ['borders << {Hash}',             'borders << { x: $1, y: $2, w: $3, h: $4 }',                                         "Draw a rectangle outline using x, y, width, and height."],
        ['lines << {Hash}',               'lines << { x: $1, y: $2, x2: $3, y2: $4 }',                                         "Draw a line from one point to another."],
        ['primitives << {Hash}',          'primitives << { x: $1, y: $2, w: $3, h: $4, primitive_marker: :$5 }',               "Draw a shape by choosing its type and position."],
        ['static_solids << {Hash}',       'static_solids << { x: $1, y: $2, w: $3, h: $4 }',                                   "Keep a filled rectangle on screen until it is changed or cleared."],
        ['static_labels << {Hash}',       'static_labels << { x: $1, y: $2, text: "$3" }',                                     "Keep text on screen until it is changed or cleared."],
        ['static_sprites << {Hash}',      'static_sprites << { x: $1, y: $2, w: $3, h: $4, path: "$5" }',                      "Keep an image on screen until it is changed or cleared."],
        ['static_borders << {Hash}',      'static_borders << { x: $1, y: $2, w: $3, h: $4 }',                                  "Keep a rectangle outline on screen until it is changed or cleared."],
        ['static_lines << {Hash}',        'static_lines << { x: $1, y: $2, x2: $3, y2: $4 }',                                  "Keep a line on screen until it is changed or cleared."],
        ['static_primitives << {Hash}',   'static_primitives << { x: $1, y: $2, w: $3, h: $4, primitive_marker: :$5 }',        "Keep a shape on screen until it is changed or cleared."],
        ['debug << {Hash}',               'debug << { x: $1, y: $2, w: $3, h: $4, primitive_marker: :$5 }',                    "Draw a temporary shape while testing the game."],
        ['sounds << {String}',            "sounds << '${1:wav_or_ogg_path}'",                                                  "Play a sound file from your game."],
        ['screenshots << {Hash}',         "screenshots << { x: $1, y: $2, w: $3, h: $4, path: '$5' }",                         "Save part of the screen as an image file."],
        ['background_color = [RGB]',      'background_color = [${1:RED}, ${2:GREEN}, ${3:BLUE}]',                              "Set the screen color using red, green, and blue values."],
        ['clear_before_render = BOOLEAN', 'clear_before_render = ${1:true}',                                                   "Choose whether the screen is cleared each frame."],
        ['shader_path = PATH',            'shader_path = "${1:shaders/example.glsl}"',                                         "Choose the shader file used to draw the screen."],
        ['shader_uniforms = [HASH]',      'shader_uniforms = [{ name: :${1:UNIFORM}, value: ${2:VALUE}, type: :${3:float} }]', "Set values that a screen shader can use."],
        ['watch',                         'watch(${1:OBJECT})',                                                                "Show a value on screen while testing."],
        ['watch_ivars',                   'watch_ivars(${1:OBJECT})',                                                          "Show an object\u2019s saved values while testing."],
        ['watch_attrs',                   'watch_attrs(${1:OBJECT})',                                                          "Show an object\u2019s named values while testing."],
        ['watch_fps',                     'watch_fps',                                                                         "Show how smoothly the game is running."],
        ['clear',                         'clear',                                                                             "Remove shapes that are redrawn each frame."],
        ['reset',                         'reset',                                                                             "Clear the current output settings."]
    ];

    // Convert the raw data into actual VS Code CompletionItems
    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
