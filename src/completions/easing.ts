import * as vscode from 'vscode';

export function getEasingCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["ease",                 "ease(${1:START_TICK}, ${2:CURRENT_TICK}, ${3:DURATION}, ${4:DEFINITIONS})",                                   "Move a value smoothly over a set number of frames."],
        ["ease_extended",        "ease_extended(${1:START_TICK}, ${2:CURRENT_TICK}, ${3:END_TICK}, ${4:BEFORE}, ${5:AFTER}, ${6:DEFINITIONS})", "Ease a value with custom behavior before and after the motion."],
        ["spline",               "spline(${1:START_TICK}, ${2:CURRENT_TICK}, ${3:DURATION}, ${4:SPLINE})",                                      "Move along a smooth path over a set number of frames."],
        ["ease_spline",          "ease_spline(${1:START_TICK}, ${2:CURRENT_TICK}, ${3:DURATION}, ${4:SPLINE})",                                 "Move along a smooth path over a set number of frames."],
        ["ease_spline_extended", "ease_spline_extended(${1:START_TICK}, ${2:CURRENT_TICK}, ${3:END_TICK}, ${4:SPLINE})",                        "Move along a smooth path with a chosen end frame."],
        ["initial_value",        "initial_value(${1:DEFINITIONS})",                                                                             "Get the starting value from an animation."],
        ["final_value",          "final_value(${1:DEFINITIONS})",                                                                               "Get the ending value from an animation."],
        ["mix",                  "mix(${1:FROM}, ${2:TO}, ${3:PERCENT})",                                                                       "Blend between two values by a percentage."],
        ["smooth_step",          "smooth_step(initial: ${1:INITIAL}, final: ${2:FINAL}, perc: ${3:PERCENT})",                                   "Move between two values with a gentle start and finish."],
        ["smooth_start",         "smooth_start(initial: ${1:INITIAL}, final: ${2:FINAL}, perc: ${3:PERCENT})",                                  "Move slowly at first, then speed up."],
        ["smooth_stop",          "smooth_stop(initial: ${1:INITIAL}, final: ${2:FINAL}, perc: ${3:PERCENT})",                                   "Move quickly at first, then slow down."],
        ["identity",             "identity(${1:VALUE})",                                                                                        "Keep a value unchanged."],
        ["flip",                 "flip(${1:VALUE})",                                                                                            "Reverse an easing curve."],
        ["quad",                 "quad(${1:VALUE})",                                                                                            "Ease using a simple curved motion."],
        ["cube",                 "cube(${1:VALUE})",                                                                                            "Ease using a stronger curved motion."],
        ["quart",                "quart(${1:VALUE})",                                                                                           "Ease using a sharper curved motion."],
        ["quint",                "quint(${1:VALUE})",                                                                                           "Ease using a very sharp curved motion."],
        ["smooth_start_quad",    "smooth_start_quad(${1:VALUE})",                                                                               "Start slowly, then speed up along a curved path."],
        ["smooth_stop_quad",     "smooth_stop_quad(${1:VALUE})",                                                                                "Slow down along a curved path."],
        ["smooth_start_cube",    "smooth_start_cube(${1:VALUE})",                                                                               "Start slowly, then speed up more strongly."],
        ["smooth_stop_cube",     "smooth_stop_cube(${1:VALUE})",                                                                                "Slow down more strongly."],
        ["smooth_start_quart",   "smooth_start_quart(${1:VALUE})",                                                                              "Start slowly, then speed up sharply."],
        ["smooth_stop_quart",    "smooth_stop_quart(${1:VALUE})",                                                                               "Slow down sharply."],
        ["smooth_start_quint",   "smooth_start_quint(${1:VALUE})",                                                                              "Start slowly, then speed up very sharply."],
        ["smooth_stop_quint",    "smooth_stop_quint(${1:VALUE})",                                                                               "Slow down very sharply."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
