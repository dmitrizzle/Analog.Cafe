// tools
import React from "react"

// components
import { TinyButton } from "../../../../../components/Button"

// return
export default props => {
  console.log(props.cursorContext && props.cursorContext.parentBlockOffsets.top)
  return (
    <TinyButton
      style={{
        top: props.cursorContext
          ? props.cursorContext.parentBlockOffsets.top
          : 0,
        display: props.cursorContext.newLine ? "block" : "none"
      }}
      onClick={props.onClick}
    >
      ↫ Add Image
    </TinyButton>
  )
}
