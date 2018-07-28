import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Options from "./Options"

it("Render Options, matches snapshot", () => {
  const element = shallow(<Options />)
  expect(element).toMatchSnapshot()
})
