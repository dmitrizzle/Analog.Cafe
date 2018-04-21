// tools
import React from "react"

import { SubtitleInput } from "../../../../core/components/stateless/_controls/InputStyles"

// render
export default props => {
  return (
    <SubtitleInput
      placeholder="Your Email"
      onChange={props.onChange}
      onClick={props.onClick}
      required
      autoFocus={props.autoFocus}
      maxLength="200"
      warning={props.warning}
    />
  )
}
