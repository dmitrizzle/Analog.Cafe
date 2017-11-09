// components & tools
import React from "react"
import Picture from "../../../Picture"
import PictureDocket from "./containers/PictureDocket"
import Link from "../../../../components/Link"
import { TinyButton } from "../../../../components/Button"

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
        <div>
          {!props.readOnly &&
            focus && (
              <TinyButton
                style={{
                  width: "6em",
                  margin: "1.35em -1.5em -3.35em 0px",
                  float: "right",
                  position: "relative",
                  zIndex: "1"
                }}
                contentEditable="false"
                suppressContentEditableWarning
                onClick={event => {
                  event.preventDefault()
                  editor.onChange(
                    editor.value
                      .change()
                      .setNodeByKey(attributes["data-key"], {
                        type: "paragraph"
                      })
                      .focus()
                  )
                }}
              >
                Unquote
              </TinyButton>
            )}
          <blockquote {...attributes} className={focusClassName}>
            {children}
          </blockquote>
        </div>
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
