import React from "react"

import SubtitleInput from "../../../../user/components/forms/TextInput/components/SubtitleInput"

export default props => {
  return (
    <SubtitleInput
      placeholder="Type here."
      onChange={props.onChange}
      onClick={props.onClick}
      required
      autoFocus={props.autoFocus}
      maxLength="600"
      warning={props.warning}
      type="text"
      value={props.value}
    />
  )
}
