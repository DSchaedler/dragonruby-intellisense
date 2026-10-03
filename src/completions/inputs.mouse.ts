import * as vscode from 'vscode';

export function getMouseCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["has_focus",                    "has_focus",                                     "Whether the game window has mouse focus."],
        ["x",                            "x",                                             "Horizontal mouse position."],
        ["y",                            "y",                                             "Vertical mouse position."],
        ["point",                        "point",                                         "Mouse position as a point."],
        ["rect",                         "rect",                                          "Mouse position as a rectangle."],
        ["w",                            "w",                                             "Width of the mouse rectangle."],
        ["h",                            "h",                                             "Height of the mouse rectangle."],
        ["left",                         "left",                                          "Whether the left direction is pressed."],
        ["middle",                       "middle",                                        "Whether the middle mouse button is pressed."],
        ["right",                        "right",                                         "Whether the right direction is pressed."],
        ["previous_x",                   "previous_x",                                    "Horizontal position last frame."],
        ["previous_y",                   "previous_y",                                    "Vertical position last frame."],
        ["relative_x",                   "relative_x",                                    "Horizontal mouse movement this frame."],
        ["relative_y",                   "relative_y",                                    "Vertical mouse movement this frame."],
        ["inside_rect?",                 "inside_rect? ${1:rect}",                        "Check whether the mouse is inside a rectangle."],
        ["inside_circle?",               "inside_circle? ${1:center_point}, ${2:radius}", "Check whether the mouse is inside a circle; provide its center and radius."],
        ["intersect_rect?",              "intersect_rect? ${1:RECTANGLE}",                "Check whether the mouse position touches a rectangle."],
        ["moved",                        "moved",                                         "Whether the mouse moved this frame."],
        ["click",                        "click",                                         "Position of the latest mouse click."],
        ["click_at",                     "click_at",                                      "Frame when the latest mouse click happened."],
        ["global_click_at",              "global_click_at",                               "Overall frame when the latest click happened."],
        ["held",                         "held",                                          "Details about a held mouse button."],
        ["held_at",                      "held_at",                                       "Frame when a mouse button was first held."],
        ["global_held_at",               "global_held_at",                                "Overall frame when a mouse button was first held."],
        ["previous_click",               "previous_click",                                "Details about the previous mouse click."],
        ["down",                         "down",                                          "Whether the down direction is pressed."],
        ["up",                           "up",                                            "Whether the up direction is pressed."],
        ["key_down?",                    "key_down?(${1:BUTTON})",                        "Check whether a mouse button was pressed this frame."],
        ["key_held?",                    "key_held?(${1:BUTTON})",                        "Check whether a mouse button is still held."],
        ["key_up?",                      "key_up?(${1:BUTTON})",                          "Check whether a mouse button was released this frame."],
        ["key_down_or_held?",            "key_down_or_held?(${1:BUTTON})",                "Check whether a mouse button was pressed or is held."],
        ["button_left",                  "button_left",                                   "Whether the left mouse button is pressed."],
        ["button_middle",                "button_middle",                                 "Whether the middle mouse button is pressed."],
        ["button_right",                 "button_right",                                  "Whether the right mouse button is pressed."],
        ["button_bits",                  "button_bits",                                   "Which mouse buttons are pressed."],
        ["wheel",                        "button_wheel",                                  "How far the mouse wheel moved horizontally and vertically."],
        ["click.button_left",            "click.button_left",                             "Click details for the left mouse button."],
        ["click.button_right",           "click.button_right",                            "Click details for the right mouse button."],
        ["click.button_middle",          "click.button_middle",                           "Click details for the middle mouse button."],
        ["click.button_bits",            "click.button_bits",                             "Click details for the bits mouse button."],
        ["down.button_left",             "down.button_left",                              "Press details for the left mouse button."],
        ["down.button_right",            "down.button_right",                             "Press details for the right mouse button."],
        ["down.button_middle",           "down.button_middle",                            "Press details for the middle mouse button."],
        ["down.button_bits",             "down.button_bits",                              "Press details for the bits mouse button."],
        ["previous_click.button_left",   "previous_click.button_left",                    "Previous click details for the left mouse button."],
        ["previous_click.button_right",  "previous_click.button_right",                   "Previous click details for the right mouse button."],
        ["previous_click.button_middle", "previous_click.button_middle",                  "Previous click details for the middle mouse button."],
        ["previous_click.button_bits",   "previous_click.button_bits",                    "Previous click details for the bits mouse button."],
        ["up.button_left",               "up.button_left",                                "Release details for the left mouse button."],
        ["up.button_right",              "up.button_right",                               "Release details for the right mouse button."],
        ["up.button_middle",             "up.button_middle",                              "Release details for the middle mouse button."],
        ["up.button_bits",               "up.button_bits",                                "Release details for the bits mouse button."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
