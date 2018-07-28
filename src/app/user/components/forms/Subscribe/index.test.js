import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Subscribe from "./"

it("Render Subscribe, matches snapshot", () => {
  const element = shallow(<Subscribe />)
  expect(element).toMatchSnapshot()
})
