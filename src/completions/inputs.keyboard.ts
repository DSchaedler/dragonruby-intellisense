import * as vscode from 'vscode';

export function getKeyboardCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["active",                   "active",                         "Whether the keyboard is active."],
        ["has_focus",                "has_focus",                      "Whether the game window has keyboard focus."],
        ["up",                       "up",                             "Whether the up direction is pressed."],
        ["down",                     "down",                           "Whether the down direction is pressed."],
        ["left",                     "left",                           "Whether the left direction is pressed."],
        ["right",                    "right",                          "Whether the right direction is pressed."],
        ["left_wasd",                "left_wasd",                      "Whether the LEFT key is pressed."],
        ["right_wasd",               "right_wasd",                     "Whether the RIGHT key is pressed."],
        ["up_wasd",                  "up_wasd",                        "Whether the UP key is pressed."],
        ["down_wasd",                "down_wasd",                      "Whether the DOWN key is pressed."],
        ["left_arrow",               "left_arrow",                     "Whether the LEFT arrow key is pressed."],
        ["right_arrow",              "right_arrow",                    "Whether the RIGHT arrow key is pressed."],
        ["up_arrow",                 "up_arrow",                       "Whether the UP arrow key is pressed."],
        ["down_arrow",               "down_arrow",                     "Whether the DOWN arrow key is pressed."],
        ["left_right",               "left_right",                     "Horizontal movement: -1 left, 0 still, or 1 right."],
        ["up_down",                  "up_down",                        "Vertical movement: -1 down, 0 still, or 1 up."],
        ["left_right_wasd",          "left_right_wasd",                "Whether the LEFT key is pressed."],
        ["left_right_arrow",         "left_right_arrow",               "Horizontal direction from arrows or the directional pad."],
        ["up_down_wasd",             "up_down_wasd",                   "Whether the UP key is pressed."],
        ["up_down_arrow",            "up_down_arrow",                  "Vertical direction from arrows or the directional pad."],
        ["last_left_right",          "last_left_right",                "Horizontal direction used most recently."],
        ["last_up_down",             "last_up_down",                   "Vertical direction used most recently."],
        ["directional_vector",       "directional_vector",             "Current movement direction from the keyboard or controller."],
        ["directional_vector_wasd",  "directional_vector_wasd",        "Whether the DIRECTIONAL key is pressed."],
        ["directional_vector_arrow", "directional_vector_arrow",       "Whether the DIRECTIONAL arrow key is pressed."],
        ["directional_angle",        "directional_angle",              "Angle of the current movement direction."],
        ["last_left_right_arrow",    "last_left_right_arrow",          "Whether the LAST arrow key is pressed."],
        ["last_left_right_wasd",     "last_left_right_wasd",           "Whether the LAST key is pressed."],
        ["last_up_down_arrow",       "last_up_down_arrow",             "Whether the LAST arrow key is pressed."],
        ["last_up_down_wasd",        "last_up_down_wasd",              "Whether the LAST key is pressed."],
        ["key_down?",                "key_down?(${1:KEY})",            "Check whether a key was pressed this frame."],
        ["key_held?",                "key_held?(${1:KEY})",            "Check whether a key is still held."],
        ["key_up?",                  "key_up?(${1:KEY})",              "Check whether a key was released this frame."],
        ["key_repeat?",              "key_repeat?(${1:KEY})",          "Check whether a held key is repeating."],
        ["key_down_or_held?",        "key_down_or_held?(${1:KEY})",    "Check whether a key was pressed or is held."],
        ["key_down",                 "key_down.${1:KEY}",              "Keys pressed this frame."],
        ["key_held",                 "key_held.${1:KEY}",              "Keys that are currently held."],
        ["key_up",                   "key_up.${1:KEY}",                "Keys released this frame."],
        ["truthy_keys",              "truthy_keys",                    "Keys pressed right now."],
        ["key_down.keycodes",        "key_down.keycodes.${1:KEYCODE}", "Check a key by its key code, pressed this frame."],
        ["key_held.keycodes",        "key_held.keycodes.${1:KEYCODE}", "Check a key by its key code while held."],
        ["key_up.keycodes",          "key_up.keycodes.${1:KEYCODE}",   "Check a key by its key code, released this frame."],
        ["key_down.char",            "key_down.char",                  "Text character pressed this frame."],
        ["key_held.char",            "key_held.char",                  "Text character currently held."],
        ["key_up.char",              "key_up.char",                    "Text character released this frame."],
        ["keys",                     "keys",                           "All current keyboard key states."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
