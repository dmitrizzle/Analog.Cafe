// tools
import React from "react"

// components
import { TinyButton } from "../../../../../components/_controls/Button"

// return
export default props => {
  return (
    <TinyButton
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
    </TinyButton>
  )
}
