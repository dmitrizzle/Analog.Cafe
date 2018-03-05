// tools
import { html } from "../rules"
import localForage from "localforage"
import uuidv1 from "uuid/v1"
import { forceImageRestrictions } from "../../../../../../utils/upload-utils"
import errorMessages from "../../../../../../constants/messages/errors"

// redux
import store from "../../../../../../store"
import { setCard } from "../../../../../../actions/modalActions"

// styles
import { dot } from "../../../../../components/_icons/BlankDot"

// Analog.Cafe plugins
import { MarkHotkey } from "./mark-hotkey"
import { LinkHotkey } from "./link-hotkey"
import { ToggleFeature } from "./toggle-feature"
import { Paste } from "./paste-html"
// import { LeadingBlock } from "./leading-block"

// plugins by others
import AutoReplace from "slate-auto-replace"
import InsertImages from "slate-drop-or-paste-images"

// components

// export
export const plugins = [
  // pasting and links
  Paste({ html }),
  LinkHotkey({ key: "k" }),

  // marks
  MarkHotkey({ key: "b", type: "bold" }),
  MarkHotkey({ key: "i", type: "italic" }),

  // image
  ToggleFeature({ key: "f", node: "image" }),

  // quote
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "quote" }) // quote
    }
  }),
  AutoReplace({
    trigger: "enter",
    before: /^.|$/,
    onlyIn: "quote",
    transform: (transform, event, matches) => {
      return transform.splitBlock().setBlocks({ type: "paragraph" }) // exit quote
    }
  }),
  AutoReplace({
    trigger: "backspace",
    after: /./,
    before: /^$/,
    onlyIn: "quote",
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "paragraph" }) // transform quote to paragraph
    }
  }),

  // section separater
  AutoReplace({
    trigger: "enter",
    before: /^(\*\*\*)$/,
    transform: (transform, event, matches) => {
      return transform
        .setBlocks({ type: "divider", isVoid: true })
        .collapseToEndOfNextBlock()
        .collapseToEndOfNextBlock() // page break
    }
  }),

  // title/heading
  AutoReplace({
    trigger: "space",
    before: /^(#)$/,
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "heading" }) // heading
    }
  }),
  AutoReplace({
    trigger: "enter",
    before: /.+/,
    onlyIn: "heading",
    transform: (transform, event, matches) => {
      let heading = matches.before[0]
      if (
        heading[heading.length - 1].search(/[^\w\s]|_/) === -1 // if no punctuation mark at the end of heading...
      )
        return transform
          .insertText(".") // add a period.
          .splitBlock()
          .setBlocks({ type: "paragraph" })
      else return transform.splitBlock().setBlocks({ type: "paragraph" })
    }
  }),
  AutoReplace({
    trigger: "backspace",
    after: /./,
    before: /^$/,
    onlyIn: "heading",
    transform: (transform, event, matches) => {
      return transform.setBlocks({ type: "paragraph" }) // cancel heading
    }
  }),

  // smart quotes
  AutoReplace({
    trigger: /(")/,
    before: /[^ ”]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("”") // smart double quote (right)
    }
  }),
  AutoReplace({
    trigger: /(")/,
    before: /(^)|[ ]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("“") // smart double quote (left)
    }
  }),
  AutoReplace({
    trigger: /(')/,
    before: /[^ ”]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("’") // smart single quote (right)
    }
  }),
  AutoReplace({
    trigger: /(')/,
    before: /(^)|[ ]$/,
    transform: (transform, event, matches) => {
      return transform.insertText("‘") // smart single quote (left)
    }
  }),

  // long dash and ellipsis
  AutoReplace({
    trigger: "space",
    before: /( -)$/,
    transform: (transform, event, matches) => {
      return transform.insertText(" — ") // mdash
    }
  }),
  AutoReplace({
    trigger: "space",
    before: /(\.\.\.)$/,
    transform: (transform, event, matches) => {
      return transform.insertText("… ") // elipsis
    }
  }),

  // drag & drop image inserter tool
  InsertImages({
    insertImage: (transform, file) => {
      return forceImageRestrictions(file.size, file.type)
        .then(() => {
          const key = uuidv1()
          localForage.setItem(key, file)
          return transform.insertBlock({
            type: "image",
            isVoid: true,
            data: { file, key, src: dot }
          })
        })
        .catch(reason => {
          store.dispatch(
            setCard(
              {
                status: "ok",
                info: errorMessages.VIEW_TEMPLATE.UPLOAD_IMAGE_SIZE(10)
              },
              { url: "errors/upload" }
            )
          )
        })
    }
  })

  // TBD: LeadingBlock - a plugin that will let users add text above the
  // images at the very top of the document
  // LeadingBlock({})
]
