import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import ZigZag from "./"

it("Render ZigZag, matches snapshot", () => {
  const element = shallow(<ZigZag />)
  expect(element).toMatchSnapshot()
})
