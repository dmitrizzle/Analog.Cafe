import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Submit from "./Submit"

it("Render Submit routes, matches snapshot", () => {
  const element = shallow(<Submit />)
  expect(element).toMatchSnapshot()
})
