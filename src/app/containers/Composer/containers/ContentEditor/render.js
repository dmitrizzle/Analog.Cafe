// components & tools
import React from "react"
import Slate from "slate"
import Picture from "../../../Picture"
import PictureDocket from "../../../PictureDocket"
import Link from "../../../../components/Link"

// helpers
import { parseHref } from "../../../../../utils/link-builder"

// return

export const renderNode = props => {
  const { node, attributes, children, isSelected, editor } = props
  const focus = editor.value.isFocused && isSelected
  const focusClassName = focus ? "focus" : "nofocus"

  switch (node.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>
    case "heading":
      return <h3>{children}</h3>
    case "divider":
      return <hr className={focusClassName} />
    case "quote":
      return (
        <blockquote {...attributes} className={focusClassName}>
          {children}
        </blockquote>
      )
    case "image":
      return <Picture {...props} />
    case "docket":
      return <PictureDocket {...props} />
    case "link": {
      const { data } = node
      const href = data.get("href")
      return (
        <Link {...attributes} to={parseHref(href)}>
          {children}
        </Link>
      )
    }
    default:
      return <p {...attributes}>{children}</p>
  }
}

export const renderMark = props => {
  const { children, mark } = props
  switch (mark.type) {
    case "bold":
      return <strong>{children}</strong>
    case "italic":
      return <em>{children}</em>
    default:
      return { children }
  }
}

export const validateNode = node => {
  if (node.kind !== "document") return

  const last = node.nodes.last()
  if (last && last.type === "paragraph") return

  if (node.text.trim() === "") return

  const lastIndex = node.nodes.count()
  const block = Slate.Block.create({
    type: "paragraph",
    nodes: [Slate.Text.create()]
  })
  console.log(last.type)
  return change => change.insertNodeByKey(node.key, lastIndex, block)
}
