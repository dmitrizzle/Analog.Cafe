// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "../../../../../components/_controls/Button"
import {
  ButtonStrip,
  Item
} from "../../../../../components/_controls/ButtonStrip"

const Menu = styled(ButtonStrip)`
  display: none;

  position: absolute;
  bottom: initial !important;
  z-index: ${props => props.theme.layer.up + 1};

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
      border: 1px dashed ${props => props.theme.color.brand};
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
const MenuItem = styled(Item)`
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
            red
            script
            style={{
              width: "2em"
            }}
          >
            𝒶
          </TinyButton>
        </div>
      ) : (
        <div>
          <MenuItem
            red
            script
            left
            title="Make a heading"
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("make_heading")
            }}
          >
            𝒜
          </MenuItem>
          <MenuItem
            red
            title="Make a quote"
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("make_quote")
            }}
          >
            ❝
          </MenuItem>
          <MenuItem
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
          </MenuItem>
          <MenuItem
            script
            red={
              props.value &&
              props.value.activeMarks &&
              !props.value.activeMarks.some(mark => mark.type === "bold")
            }
            black={
              props.value &&
              props.value.activeMarks &&
              props.value.activeMarks.some(mark => mark.type === "bold")
            }
            onClick={event => event.preventDefault()}
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("toggle_bold")
            }}
          >
            <strong style={{ fontWeight: "700 !important" }}>bold</strong>
          </MenuItem>
          <MenuItem
            script
            red={
              props.value &&
              props.value.activeMarks &&
              !props.value.activeMarks.some(mark => mark.type === "italic")
            }
            black={
              props.value &&
              props.value.activeMarks &&
              props.value.activeMarks.some(mark => mark.type === "italic")
            }
            right
            onClick={event => event.preventDefault()}
            onMouseDown={event => event.preventDefault()}
            onMouseUp={event => {
              event.preventDefault()
              props.formatCommand("toggle_italic")
            }}
          >
            <em>italic</em>
          </MenuItem>
        </div>
      )}
    </Menu>
  )
}
