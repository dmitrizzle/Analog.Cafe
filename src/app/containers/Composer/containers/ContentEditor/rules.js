// tools
import Html from "slate-html-serializer"
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
const plainText = (el, title = false) => {
  const textify = el => el.innerText || el.textContent
  let text = title ? toTitleCase(textify(el)) : textify(el)
  el.innerHTML = text
  console.log(el)
  return el
}

// template for making text node
const makeTextNode = text => {
  return {
    kind: "text",
    ranges: [
      {
        kind: "range",
        text: text
      }
    ]
  }
}

// deserialize copy-paste html content
const rules = [
  {
    deserialize(el, next) {
      // cycle through block types
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return

      switch (block) {
        case "paragraph": {
          return {
            kind: "block",
            type: "paragraph",
            nodes: next(el.childNodes)
          }
        }
        case "quote": {
          return {
            kind: "block",
            type: "quote",
            nodes: next(plainText(el).childNodes)
          }
        }
        case "heading": {
          return {
            kind: "block",
            type: "heading",
            nodes: next(plainText(el, true).childNodes)
          }
        }
        case "image": {
          let imageSrc = el.getAttribute("src") || el.getAttribute("srcset")
          if (!isUrl(imageSrc)) return
          return {
            kind: "block",
            type: "image",
            isVoid: true,
            data: { src: el.getAttribute("src") || el.getAttribute("srcset") } // this image needs to be uploaded
          }
        }
        case "link": {
          return {
            kind: "inline",
            type: "link",
            data: {
              href: el.getAttribute("href")
            },
            nodes: next(plainText(el, true).childNodes)
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
        nodes: next(el.childNodes)
      }
    }
  }
]
export const html = new Html({ rules })
