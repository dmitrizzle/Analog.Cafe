import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import HeaderLarge from "./"

it("Render HeaderLarge, matches snapshot", () => {
  const element = shallow(<HeaderLarge />)
  expect(element).toMatchSnapshot()
})
