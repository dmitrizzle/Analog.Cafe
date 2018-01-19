// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "../../../../../components/_controls/Button"

const ImageButton = styled(TinyButton)`
  ${props => props.theme.size.breakpoint.max.m`
    right: -${props => props.theme.size.block.spacing}em;
  `};
`

// return
export default props => {
  return (
    <ImageButton
      followComposerCursor
      style={{
        top: props.cursorContext
          ? props.cursorContext.parentBlockOffsets.top
          : 0,
        display: props.cursorContext.newLine ? "block" : "none",
        opacity: props.editorFocus ? "1" : "0"
      }}
      onClick={props.onClick}
    >
      ↫ Add Image
    </ImageButton>
  )
}
