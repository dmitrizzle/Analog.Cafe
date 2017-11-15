// tools
import React from "react"
import { SubtitleInput } from "../../../components/InputStyles"

// render
export default props => {
  return (
    <SubtitleInput
      placeholder="Your Email"
      onChange={props.onChange}
      required
      maxLength="200"
      warning={props.warning}
    />
  )
}
