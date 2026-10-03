import * as vscode from 'vscode';

export function getNumericCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["frame",             "frame(${1:START}, ${2:FINISH}, ${3:DURATION})",                 "Move a value from a start to an end over a number of frames."],
        ["frame_index",       "frame_index(${1:DURATION})",                                    "Find which frame of an animation is playing."],
        ["rand",              "rand(${1:MAX})",                                                "Choose a random number, optionally up to a limit."],
        ["elapsed_time",      "elapsed_time(${1:START_TICK})",                                 "Get time passed since a chosen frame."],
        ["elapsed?",          "elapsed?(${1:START_TICK}, ${2:DURATION})",                      "Check whether a chosen amount of time has passed."],
        ["to_sf",             "to_sf",                                                         "Show a number with a chosen number of useful digits."],
        ["to_si",             "to_si",                                                         "Show a large or small number in a shorter form."],
        ["vector_x",          "vector_x(${1:ANGLE})",                                          "Get the horizontal direction for an angle."],
        ["vector_y",          "vector_y(${1:ANGLE})",                                          "Get the vertical direction for an angle."],
        ["idiv",              "idiv(${1:DIVISOR})",                                            "Divide and keep a whole-number result."],
        ["fdiv",              "fdiv(${1:DIVISOR})",                                            "Divide and keep a decimal result."],
        ["zmod?",             "zmod?(${1:DIVISOR})",                                           "Check whether a number divides evenly into this one."],
        ["lerp",              "lerp(${1:TO}, ${2:PERCENT})",                                   "Move partway from this number to another."],
        ["remap",             "remap(${1:FROM_MIN}, ${2:FROM_MAX}, ${3:TO_MIN}, ${4:TO_MAX})", "Convert a number from one range to another."],
        ["clamp",             "clamp(${1:MIN}, ${2:MAX})",                                     "Keep a number between a minimum and maximum."],
        ["clamp_wrap",        "clamp_wrap(${1:MIN}, ${2:MAX})",                                "Wrap a number around when it passes either limit."],
        ["between?",          "between?(${1:MIN}, ${2:MAX})",                                  "Check whether a number is between two limits."],
        ["mid",               "mid(${1:OTHER_VALUE})",                                         "Find the middle of two numbers."],
        ["min",               "min(${1:OTHER_VALUE})",                                         "Choose the smaller of two numbers."],
        ["max",               "max(${1:OTHER_VALUE})",                                         "Choose the larger of two numbers."],
        ["times",             "times { |${1:index}| $0 }",                                     "Run code a chosen number of times."],
        ["map",               "map { |${1:value}| $0 }",                                       "Make values by running code across a number range."],
        ["seconds",           "seconds",                                                       "Convert seconds to game frames."],
        ["to_degrees",        "to_degrees",                                                    "Change an angle from radians to degrees."],
        ["to_radians",        "to_radians",                                                    "Change an angle from degrees to radians."],
        ["compose_blendmode", "compose_blendmode(${1:BLEND_MODE})",                            "Combine image blend settings."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
