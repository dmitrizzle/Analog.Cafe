import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import PlainTextarea from "./PlainTextarea"
import SubtitleInput from "./SubtitleInput"
import SubtitleTextarea from "./SubtitleTextarea"
import TextareaWithHighlights from "./TextareaWithHighlights"
import TitleInput from "./TitleInput"
import TitleTextarea from "./TitleTextarea"

it("Render PlainTextarea without crashing", () => {
  shallow(<PlainTextarea />)
})

it("Render SubtitleInput without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <SubtitleInput />
    </ThemeProvider>
  )
})

it("Render SubtitleTextarea without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <SubtitleTextarea />
    </ThemeProvider>
  )
})

it("Render TextareaWithHighlights without crashing", () => {
  shallow(<TextareaWithHighlights />)
})

it("Render TitleInput without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <TitleInput />
    </ThemeProvider>
  )
})

it("Render TitleTextarea without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <TitleTextarea />
    </ThemeProvider>
  )
})
