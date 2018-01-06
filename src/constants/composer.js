// default title, subtitle and content ("state") for Composer when blank
export const DEFAULT_COMPOSER_HEADER_STATE = { title: "", subtitle: "" }
export const DEFAULT_COMPOSER_EDITOR_STATE = {
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: ""
              }
            ]
          }
        ]
      }
    ]
  }
}
