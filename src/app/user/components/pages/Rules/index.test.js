import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Rules from "./"

it("Render Rules, matches snapshot", () => {
  const element = shallow(<Rules />)
  expect(element).toMatchSnapshot()
})
