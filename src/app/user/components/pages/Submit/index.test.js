import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Submit from "./"

it("Render Submit, matches snapshot", () => {
  const element = shallow(<Submit />)
  expect(element).toMatchSnapshot()
})
