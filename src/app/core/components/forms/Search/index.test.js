import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Search from "./"

it("Render Search, matches snapshot", () => {
  const element = shallow(<Search />)
  expect(element).toMatchSnapshot()
})
