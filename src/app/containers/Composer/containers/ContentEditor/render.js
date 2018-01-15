// components & tools
import React from "react"
import Picture from "../../../Picture"
import PictureDocket from "./containers/PictureDocket"
import Link from "../../../../components/_controls/Link"
import { TinyButton } from "../../../../components/_controls/Button"
import styled from "styled-components"

// helpers
import { parseHref } from "../../../../../utils/link-builder"

// return
const UnquoteButton = styled(TinyButton)`
  width: 6em;
  margin: 1.35em -${props => props.theme.size.block.column.safety}em -3.35em 0;
  float: right;
  position: relative;
  z-index: ${props => props.theme.layer.up};
  ${props => props.theme.size.breakpoint.max.m`
    right: ${props => props.theme.size.block.spacing / 2}em;
  `};
`

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
              <UnquoteButton
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
              </UnquoteButton>
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
