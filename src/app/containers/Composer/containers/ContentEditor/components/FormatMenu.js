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
  bottom: initial !important;
  z-index: ${props => props.theme.layer.up};

  &.touch {
    margin-top: -65px;
    ${props => props.theme.size.breakpoint.min.m`
    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 57px;
      margin-left: calc(5em - 1px);
      margin-top: 2px;
      border: 1px dashed #ee246d;
      z-index: -1;
    }`};
  }
  ${props => props.theme.size.breakpoint.max.s`
    width: 100vw;
    left: 0 !important;
    &.touch {
      margin-top: -55px;
    }
  `};
`
const Item = styled(({ left, right, script, ...props }) => (
  <TinyButton {...props} />
))`
  margin: 0;
  border-radius: 0;
  ${props =>
    props.left
      ? `border-radius: ${props.theme.effects.borderRadius.small}em 0 0 ${
          props.theme.effects.borderRadius.small
        }em`
      : null};

  ${props =>
    props.right
      ? `border-radius: 0 ${props.theme.effects.borderRadius.small}em ${
          props.theme.effects.borderRadius.small
        }em 0`
      : null};

  ${props =>
    props.script
      ? `font-family: ${
          props.theme.typography.font.serif
        } !important;font-weight: 400 !important;`
      : null};

  ${props => props.theme.size.breakpoint.max.s`
    border-radius: 0;
    padding: 1em;
  `};
`

// render
export default props => {
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
          <TinyButton
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("undo_heading")
            }}
          >
            Undo Heading
          </TinyButton>
        </div>
      ) : (
        <div>
          <Item
            red
            left
            style={{ textShadow: "2px 2px rgba(255, 255, 255, 0.5)" }}
            title="Make a heading"
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("make_heading")
            }}
          >
            T
          </Item>
          <Item
            red
            title="Make a quote"
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("make_quote")
            }}
          >
            ❝
          </Item>
          <Item
            script
            red={!props.value.inlines.some(node => node.type === "link")}
            black={props.value.inlines.some(node => node.type === "link")}
            title="Add a link"
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("toggle_link")
            }}
          >
            ☍
          </Item>
          <Item
            script
            red={!props.value.activeMarks.some(mark => mark.type === "bold")}
            black={props.value.activeMarks.some(mark => mark.type === "bold")}
            onClick={event => event.preventDefault()}
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("toggle_bold")
            }}
          >
            <strong style={{ fontWeight: "700 !important" }}>bold</strong>
          </Item>
          <Item
            script
            red={!props.value.activeMarks.some(mark => mark.type === "italic")}
            black={props.value.activeMarks.some(mark => mark.type === "italic")}
            right
            onClick={event => event.preventDefault()}
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("toggle_italic")
            }}
          >
            <em>italic</em>
          </Item>
        </div>
      )}
    </Menu>
  )
}
