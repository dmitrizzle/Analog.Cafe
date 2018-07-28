import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import Sidenote from "./"

it("Render Sidenote, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <Sidenote />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
