import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import HeaderSubtitle from "./HeaderSubtitle"
import HeaderTitle from "./HeaderTitle"
import HeaderWrapper from "./HeaderWrapper"

it("Render HeaderSubtitle without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderSubtitle />
    </ThemeProvider>
  )
})

it("Render HeaderTitle without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderTitle />
    </ThemeProvider>
  )
})

it("Render HeaderWrapper without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderWrapper />
    </ThemeProvider>
  )
})
