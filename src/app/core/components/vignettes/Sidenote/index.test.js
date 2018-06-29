import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import Sidenote from "./"

it("Render Sidenote without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <Sidenote />
    </ThemeProvider>
  )
})
