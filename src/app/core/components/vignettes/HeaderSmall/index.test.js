import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import HeaderSmall from "./"

it("Render HeaderSmall without crashing", () => {
  shallow(
    <ThemeProvider theme={APP_THEME}>
      <HeaderSmall />
    </ThemeProvider>
  )
})
