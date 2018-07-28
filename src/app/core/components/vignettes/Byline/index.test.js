import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import Byline from "./"

it("Render Byline, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <Byline />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
