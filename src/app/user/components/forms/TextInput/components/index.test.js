import "jest-styled-components"

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

it("Render PlainTextarea, matches snapshot", () => {
  const element = shallow(<PlainTextarea />)
  expect(element).toMatchSnapshot()
})

it("Render SubtitleInput, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <SubtitleInput />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render SubtitleTextarea, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <SubtitleTextarea />
    </ThemeProvider>
  )
})

it("Render TextareaWithHighlights, matches snapshot", () => {
  const element = shallow(<TextareaWithHighlights />)
  expect(element).toMatchSnapshot()
})

it("Render TitleInput, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <TitleInput />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render TitleTextarea, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <TitleTextarea />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
