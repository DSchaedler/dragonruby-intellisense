import * as vscode from 'vscode';

export function getLayoutCompletions(): vscode.CompletionItem[] {
    const snippetData = [
        ["rect",                 "rect(row: ${1:ROW}, col: ${2:COL}, w: ${3:WIDTH}, h: ${4:HEIGHT})",           "Place an item in a row and column of the screen grid; set its size in cells."],
        ["allscreen_rect",       "allscreen_rect(row: ${1:ROW}, col: ${2:COL}, w: ${3:WIDTH}, h: ${4:HEIGHT})", "Place an item using the full display area."],
        ["rects",                "rects(${1:ITEMS})",                                                           "Place a group of items in the screen grid."],
        ["debug_primitives",     "debug_primitives",                                                            "Show grid lines to help place items."],
        ["portrait?",            "portrait?",                                                                   "Check whether the layout is taller than it is wide."],
        ["landscape?",           "landscape?",                                                                  "Check whether the layout is wider than it is tall."],
        ["row_count",            "row_count",                                                                   "Number of rows available for placing items."],
        ["row_max_index",        "row_max_index",                                                               "Last row number available."],
        ["col_count",            "col_count",                                                                   "Number of columns available for placing items."],
        ["col_max_index",        "col_max_index",                                                               "Last column number available."],
        ["font_size",            "font_size(${1:SIZE})",                                                        "Choose text size for the layout grid."],
        ["font_size_xl",         "font_size_xl",                                                                "Extra-large text size for the layout grid."],
        ["font_size_lg",         "font_size_lg",                                                                "Large text size for the layout grid."],
        ["font_size_med",        "font_size_med",                                                               "Medium text size for the layout grid."],
        ["font_size_sm",         "font_size_sm",                                                                "Small text size for the layout grid."],
        ["font_size_xs",         "font_size_xs",                                                                "Extra-small text size for the layout grid."],
        ["safe_rect",            "safe_rect",                                                                   "Area of the screen safe for placing items."],
        ["control_rect",         "control_rect",                                                                "Area reserved for on-screen controls."],
        ["point",                "point(${1:OPTIONS})",                                                         "Find a position in the layout grid."],
        ["row",                  "row(${1:INDEX})",                                                             "Find the screen position for a row."],
        ["row_from_bottom",      "row_from_bottom(${1:INDEX})",                                                 "Find a row position counting up from the bottom."],
        ["col",                  "col(${1:INDEX})",                                                             "Find the screen position for a column."],
        ["col_from_right",       "col_from_right(${1:INDEX})",                                                  "Find a column position counting from the right."],
        ["rect_group",           "rect_group(${1:OPTIONS})",                                                    "Place related items together in the layout grid."],
        ["cell_width",           "cell_width",                                                                  "Width of one layout cell."],
        ["cell_height",          "cell_height",                                                                 "Height of one layout cell."],
        ["gutter_width",         "gutter_width",                                                                "Space between layout columns."],
        ["gutter_height",        "gutter_height",                                                               "Space between layout rows."],
        ["outer_gutter",         "outer_gutter",                                                                "Space around the outside of the layout."],
        ["w",                    "w(${1:CELLS})",                                                               "Convert a number of cells to screen width."],
        ["h",                    "h(${1:CELLS})",                                                               "Convert a number of cells to screen height."],
        ["rect_center",          "rect_center(${1:RECT})",                                                      "Find the center of a rectangle."],
        ["logical_rect",         "logical_rect",                                                                "Screen area used by the game."],
        ["font_size_cell",       "font_size_cell",                                                              "Text size based on a layout cell."],
        ["font_px_to_pt",        "font_px_to_pt(${1:PIXELS})",                                                  "Convert image pixels to text points."],
        ["font_pt_to_px",        "font_pt_to_px(${1:POINTS})",                                                  "Convert text points to image pixels."],
        ["rect_defaults",        "rect_defaults",                                                               "Default position and size for layout rectangles."],
        ["orientation_changed!", "orientation_changed!",                                                        "Update the layout after the screen turns."]
    ];

    const snippets = snippetData.map(([label, snippet, detail]) => {
        const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
        item.insertText = new vscode.SnippetString(snippet);
        item.detail = detail;
        return item;
    });

    return snippets;
}
