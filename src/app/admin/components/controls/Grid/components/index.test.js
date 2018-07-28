import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import AspectRatio from "./AspectRatio"
import GridButton from "./GridButton"
import GridButtonCaption from "./GridButtonCaption"
import GridButtonImage from "./GridButtonImage"
import GridCaption from "./GridCaption"
import GridRow from "./GridRow"
import GridWrapper from "./GridWrapper"

it("Render AspectRatio without crashing, matches snapshot", () => {
  const element = shallow(<AspectRatio />)
  expect(element).toMatchSnapshot()
})

it("Render GridButton without crashing, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridButton />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render GridButtonCaption without crashing, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridButtonCaption />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render GridButtonImage without crashing, matches snapshot", () => {
  const element = shallow(<GridButtonImage />)
})

it("Render GridCaption without crashing, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridCaption />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})

it("Render GridRow without crashing, matches snapshot", () => {
  const element = shallow(<GridRow />)
  expect(element).toMatchSnapshot()
})

it("Render GridWrapper without crashing, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridWrapper />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
