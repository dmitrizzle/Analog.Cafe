import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import CardButton from "./CardButton"
import CardCaption from "./CardCaption"
import CardFigure from "./CardFigure"
import CardHeader from "./CardHeader"
import CardIntegrated from "./CardIntegrated"
import CardPopup from "./CardPopup"

it("Render CardButton, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardButton />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render CardCaption, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardCaption />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render CardFigure, matches snapshot", () => {
  const element = shallow(<CardFigure />)
  expect(element).toMatchSnapshot()
})

it("Render CardHeader, matches snapshot", () => {
  const element = shallow(<CardHeader />)
  expect(element).toMatchSnapshot()
})

it("Render CardIntegrated, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardIntegrated />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render CardPopup, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardPopup />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
