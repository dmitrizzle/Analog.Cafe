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

it("Render CardButton without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardButton />
    </ThemeProvider>
  )
})

it("Render CardCaption without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardCaption />
    </ThemeProvider>
  )
})

it("Render CardFigure without crashing", () => {
  shallow(<CardFigure />)
})

it("Render CardHeader without crashing", () => {
  shallow(<CardHeader />)
})

it("Render CardIntegrated without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardIntegrated />
    </ThemeProvider>
  )
})

it("Render CardPopup without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <CardPopup />
    </ThemeProvider>
  )
})
