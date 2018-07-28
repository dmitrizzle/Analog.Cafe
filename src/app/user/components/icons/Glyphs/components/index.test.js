import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import CapitalA from "./CapitalA"
import LowerA from "./LowerA"

it("Render CapitalA, matches snapshot", () => {
  const element = shallow(<CapitalA />)
  expect(element).toMatchSnapshot()
})

it("Render LowerA, matches snapshot", () => {
  const element = shallow(<LowerA />)
  expect(element).toMatchSnapshot()
})
