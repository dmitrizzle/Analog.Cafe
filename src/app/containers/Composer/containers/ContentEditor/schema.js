// return
export const schema = {
  document: {
    nodes: [
      {
        types: [
          "paragraph",
          "heading",
          "divider",
          "quote",
          "image",
          "docket",
          "link"
        ]
      }
    ]
  },
  blocks: {
    heading: {
      nodes: [{ kinds: ["text"] }]
    },
    link: {
      nodes: [{ kinds: ["text"] }]
    },
    divider: {
      isVoid: true
    },
    image: {
      isVoid: true,
      data: {
        src: v => v
      }
    },
    docket: {
      isVoid: true
    }
  }
}
