import * as vscode from 'vscode';

export function getInputsCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["last_active",                 "last_active",                       "Which device was used most recently."],
        ["last_active_at",              "last_active_at ${1:device}",        "Frame when the last input happened."],
        ["last_active_global_at",       "last_active_global_at ${1:device}", "Overall frame when the last input happened."],
        ["locale",                      "locale",                            "Language set on the player\u2019s device."],
        ["locale_raw",                  "locale_raw",                        "Original language setting from the device."],
        ["up",                          "up",                                "Whether the up direction is pressed."],
        ["down",                        "down",                              "Whether the down direction is pressed."],
        ["left",                        "left",                              "Whether the left direction is pressed."],
        ["right",                       "right",                             "Whether the right direction is pressed."],
        ["left_right",                  "left_right",                        "Horizontal movement: -1 left, 0 still, or 1 right."],
        ["left_right_perc",             "left_right_perc",                   "Horizontal movement, including analog stick tilt."],
        ["left_right_directional",      "left_right_directional",            "Horizontal movement from arrows or the directional pad."],
        ["left_right_directional_perc", "left_right_directional_perc",       "Horizontal movement from arrows or analog stick."],
        ["up_down",                     "up_down",                           "Vertical movement: -1 down, 0 still, or 1 up."],
        ["up_down_directional",         "up_down_directional",               "Vertical movement from arrows or the directional pad."],
        ["up_down_perc",                "up_down_perc",                      "Vertical movement, including analog stick tilt."],
        ["up_down_directional_perc",    "up_down_directional_perc",          "Vertical movement from arrows or analog stick."],
        ["last_left_right",             "last_left_right",                   "Horizontal direction used most recently."],
        ["last_up_down",                "last_up_down",                      "Vertical direction used most recently."],
        ["directional_vector",          "directional_vector",                "Current movement direction from the keyboard or controller."],
        ["last_directional_vector",     "last_directional_vector",           "Most recent movement direction."],
        ["directional_angle",           "directional_angle",                 "Angle of the current movement direction."],
        ["left_right_arrow",            "left_right_arrow",                  "Horizontal direction from arrows or the directional pad."],
        ["up_down_arrow",               "up_down_arrow",                     "Vertical direction from arrows or the directional pad."],
        ["click",                       "click",                             "Position of the latest mouse click."],
        ["controllers",                 "controllers",                       "Connected game controllers."],
        ["http_requests",               "http_requests",                     "Web requests waiting to be handled."],
        ["application_control",         "application_control",               "Input events for controlling the app."],
        ["headset",                     "headset",                           "Headset position and direction."],
        ["a11y",                        "a11y",                              "Accessibility input settings."],
        ["mouse_touch",                 "mouse_touch",                       "Position shared by mouse and touch input."],
        ["touch_enabled?",              "touch_enabled?",                    "Whether the device supports touch input."],
        ["touch_center",                "touch_center",                      "Older name for the mouse-touch position."],
        ["key_down",                    "key_down",                          "Keys pressed this frame."],
        ["key_held",                    "key_held",                          "Keys that are currently held."],
        ["key_up",                      "key_up",                            "Keys released this frame."],
        ["clear_text",                  "clear_text",                        "Clear text entered by the player."],
        ["pinch_zoom",                  "pinch_zoom",                        "Amount of the current pinch gesture."],
        ["text",                        "text",                              "Text entered by the player."],
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return [
        ...snippets,
        new vscode.CompletionItem('keyboard', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('mouse', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('touch', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_one', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_two', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_three', vscode.CompletionItemKind.Property),
        new vscode.CompletionItem('controller_four', vscode.CompletionItemKind.Property)
    ];
}
