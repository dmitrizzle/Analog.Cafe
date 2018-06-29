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

it("Render AspectRatio without crashing", () => {
  shallow(<AspectRatio />)
})

it("Render GridButton without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridButton />
    </ThemeProvider>
  )
})

it("Render GridButtonCaption without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridButtonCaption />
    </ThemeProvider>
  )
})

it("Render GridButtonImage without crashing", () => {
  shallow(<GridButtonImage />)
})

it("Render GridCaption without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridCaption />
    </ThemeProvider>
  )
})

it("Render GridRow without crashing", () => {
  shallow(<GridRow />)
})

it("Render GridWrapper without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <GridWrapper />
    </ThemeProvider>
  )
})
