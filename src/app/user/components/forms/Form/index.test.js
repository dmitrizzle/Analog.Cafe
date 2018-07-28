import "jest-styled-components"

import { ThemeProvider } from "styled-components"
import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../constants"
import Form from "./"

it("Render Form, matches snapshot", () => {
  const element = shallow(
    <ThemeProvider theme={APP_THEME}>
      <Form />
    </ThemeProvider>
  )
  expect(element).toMatchSnapshot()
})
