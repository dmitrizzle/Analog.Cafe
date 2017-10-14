// styles
import React from "react"
import styled from "styled-components"
import { title, subtitle, textarea, reset } from "./styles"

// tools
import Textarea from "../_async/Textarea"
// import TextareaAutosize from "react-autosize-textarea"

// return
// remove `warning` props from style HOCs
export const PlainTextarea = styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${reset};
`
export const TextareaWithHighlights = styled(
  ({ caution, warning, ...props }) => <Textarea {...props} />
)`
  ${textarea};
`
export const TitleTextarea = styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${title};
`
export const SubtitleTextarea = styled(({ caution, warning, ...props }) => (
  <Textarea {...props} />
))`
  ${subtitle};
`
export const TitleInput = styled(({ caution, warning, ...props }) => (
  <input {...props} />
))`
  ${title};
`
export const SubtitleInput = styled(({ caution, warning, ...props }) => (
  <input {...props} />
))`
  ${subtitle};
`
