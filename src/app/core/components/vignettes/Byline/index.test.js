import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import Byline from "./"

it("Render Byline without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <Byline />
    </ThemeProvider>
  )
})
