// default title, subtitle and content ("state") for Composer when blank
export const DEFAULT_COMPOSER_HEADER_STATE = { title: "", subtitle: "" }
export const DEFAULT_COMPOSER_EDITOR_STATE = {
  document: {
    nodes: [
      {
        kind: "block",
        type: "paragraph",
        nodes: [
          {
            kind: "text",
            ranges: [
              {
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
}
