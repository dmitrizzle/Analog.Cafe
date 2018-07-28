import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import App from "./App.js"

it("Render routes App, matches snapshot", () => {
  const element = shallow(<App />)
  expect(element).toMatchSnapshot()
})
