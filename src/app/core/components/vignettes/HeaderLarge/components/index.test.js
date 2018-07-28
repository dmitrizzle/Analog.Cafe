import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import HeaderSubtitle from "./HeaderSubtitle"
import HeaderTitle from "./HeaderTitle"
import HeaderWrapper from "./HeaderWrapper"

it("Render HeaderSubtitle, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderSubtitle />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render HeaderTitle, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderTitle />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render HeaderWrapper, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderWrapper />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
