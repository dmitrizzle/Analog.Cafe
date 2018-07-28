import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import Caption from "./"

it("Render Caption, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <Caption />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
