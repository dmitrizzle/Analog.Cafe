import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import App from "./app"

it("Render App without crashing, matches snapshot", () => {
  const element = shallow(<App />)
  expect(element).toMatchSnapshot()
})
