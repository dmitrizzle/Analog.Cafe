// components & tools
import React from "react"
import Picture from "../../../Picture"
import PictureDocket from "../../../PictureDocket"
import Link from "../../../../components/Link"

// helpers
import { parseHref } from "../../../../../utils/link-builder"

// return

export const renderNode = props => {
  console.log(props)
  const { node, attributes, children, isSelected, editor } = props
  const focus = editor.value.isFocused && isSelected
  const focusClassName = focus ? "focus" : "nofocus"

  switch (node.type) {
    case "paragraph":
      return (
        <p {...attributes} style={{ position: "relative" }}>
          {children}
        </p>
      )
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
    case "link":
      return (
        <Link {...props} to={parseHref("href")}>
          {children}
        </Link>
      )
    default:
      return (
        <p {...attributes} style={{ position: "relative" }}>
          {children}
        </p>
      )
  }
}
