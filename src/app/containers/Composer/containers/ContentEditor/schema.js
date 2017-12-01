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
  },
  inlines: {
    quote: {
      nodes: [{ types: ["text"] }]
    },
    paragraph: {
      nodes: [{ types: ["text", "link"] }]
    },
    heading: {
      nodes: [{ types: ["text"] }]
    }
  }
}
