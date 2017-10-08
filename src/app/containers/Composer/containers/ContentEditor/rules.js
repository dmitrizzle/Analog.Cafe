// tools
import Html from "slate-html-serializer"
import Plain from "slate-plain-serializer"
import isUrl from "is-url"
import toTitleCase from "titlecase"

// components

// return

// dictionary
const BLOCK_TAGS = {
  p: "paragraph",
  blockquote: "quote",
  hr: "divider",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  a: "link",
  img: "image"
}
const MARK_TAGS = {
  em: "italic",
  i: "italic",
  strong: "bold",
  b: "bold"
}

// extract just the text from node:
const plainText = el => {
  let children = el.children
  let plainText = ""
  const aseemble = element =>
    element.data ? (plainText += element.data) : null

  // 0-level deep (no nested elements)
  if (children[0] && children[0].data) children.forEach(aseemble)
  else
    // 1+ levels deep (get text from nested elements)
    for (var property in children) {
      if (children.hasOwnProperty(property)) {
        if (children[property].children)
          children[property].children.forEach(aseemble)
      }
    }

  return plainText !== "" ? plainText : false
}

// deserialize copy-paste html content
const rules = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName]
      if (!block) return
      switch (block) {
        case "paragraph": {
          return {
            kind: "block",
            type: block,
            nodes: next(el.children)
          }
        }
        case "quote": {
          return {
            kind: "block",
            type: block,
            nodes: plainText(el)
              ? [Plain.createFromString(plainText(el))]
              : next(el.children)
          }
        }
        case "heading": {
          return {
            kind: "block",
            type: block,
            nodes: plainText(el)
              ? [Plain.createFromString(toTitleCase(plainText(el)))]
              : next(el.children)
          }
        }
        case "image": {
          let imageSrc = el.attribs.src || el.attribs.srcset
          if (!isUrl(imageSrc)) return
          return {
            kind: "block",
            type: "image",
            isVoid: true,
            data: { src: el.attribs.src || el.attribs.srcset } // this image needs to be uploaded
          }
        }
        case "link": {
          return {
            kind: "inline",
            type: "link",
            data: {
              href: el.attribs.href
            },
            nodes: plainText(el)
              ? [Plain.createFromString(plainText(el))]
              : next(el.children)
          }
        }
        default:
          return null
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName]
      if (!mark) return
      return {
        kind: "mark",
        type: mark,
        nodes: next(el.children)
      }
    }
  }
]
export const html = new Html({ rules })
