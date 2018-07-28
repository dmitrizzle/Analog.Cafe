import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Logo from "./"

it("Render Logo, matches snapshot", () => {
  const element = shallow(<Logo />)
  expect(element).toMatchSnapshot()
})
