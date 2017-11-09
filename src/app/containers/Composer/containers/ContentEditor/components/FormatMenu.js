// tools
import React from "react"

// components
import { TinyButton } from "../../../../../components/Button"

import styled from "styled-components"
const Menu = styled.div`
  display: none;
  & > div {
    display: flex;
    margin: 0;
  }
  width: 10em;
  position: absolute;
  border-radius: ${props => props.theme.effects.borderRadius.small}em;
  z-index: ${props => props.theme.layer.up};
`
const Item = styled(({ left, right, script, ...props }) => (
  <TinyButton {...props} />
))`
  margin: 0;
  border-radius: 0;
  ${props =>
    props.left
      ? `border-radius: ${props.theme.effects.borderRadius.small}em 0 0 ${props
          .theme.effects.borderRadius.small}em`
      : null};

  ${props =>
    props.right
      ? `border-radius: 0 ${props.theme.effects.borderRadius.small}em ${props
          .theme.effects.borderRadius.small}em 0`
      : null};

  ${props =>
    props.script
      ? `font-family: ${props.theme.typography.font
          .serif} !important;font-weight: 400 !important;`
      : null};
`

// render
export default props => {
  console.log(
    props.value.blocks.some(
      node => node.type === "paragraph" && node.text === ""
    )
  )
  // quotes have no hover menu
  if (props.value.blocks.some(node => node.type === "quote")) return null
  // selecting text containing paragraphs and heading has no menu
  // (selecting just a heading does have special menu, see below)
  if (
    props.value.blocks.some(node => node.type === "heading") &&
    // if selection has a heading and an empty paragraph, heading menu is OK:
    props.value.blocks.some(
      node => node.type === "paragraph" && node.text !== ""
    )
  )
    return null
  return (
    <Menu innerRef={props.menuRef}>
      {props.value.blocks.some(node => node.type === "heading") ? (
        <div style={{ marginBottom: "-1em" }}>
          <TinyButton>Undo Heading</TinyButton>
        </div>
      ) : (
        <div>
          <Item
            red
            left
            style={{ textShadow: "2px 2px rgba(255, 255, 255, 0.5)" }}
            title="Make a heading"
          >
            T
          </Item>
          <Item red title="Make a quote">
            ❝
          </Item>
          <Item red script title="Add a link">
            ␥
          </Item>
          <Item
            script
            red={!props.value.activeMarks.some(mark => mark.type === "bold")}
            black={props.value.activeMarks.some(mark => mark.type === "bold")}
          >
            <strong style={{ fontWeight: "700 !important" }}>bold</strong>
          </Item>
          <Item
            script
            red={!props.value.activeMarks.some(mark => mark.type === "italic")}
            black={props.value.activeMarks.some(mark => mark.type === "italic")}
            right
          >
            <em>italic</em>
          </Item>
        </div>
      )}
    </Menu>
  )
}
