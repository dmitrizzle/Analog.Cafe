import React from "react"

import SubtitleInput from "../TextInput/components/SubtitleInput"

export default props => {
  return (
    <SubtitleInput
      placeholder="your@email"
      onChange={props.onChange}
      onClick={props.onClick}
      required
      autoFocus={props.autoFocus}
      maxLength="200"
      warning={props.warning}
      type="email"
    />
  )
}
