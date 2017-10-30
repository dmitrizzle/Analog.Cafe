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
    paragraph: {
      nodes: [{ kinds: ["text"] }]
    },
    heading: {
      nodes: [{ kinds: ["text"] }]
    },
    divider: {
      isVoid: true
    },
    quote: {
      nodes: [{ kinds: ["text"] }]
    },

    image: {
      isVoid: true,
      data: {
        src: v => v
      }
    },
    docket: {
      isVoid: true
    },
    link: {
      nodes: [{ kinds: ["text"] }]
    }
  }
}
