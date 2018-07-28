import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Link from "./"

it("Render Link, matches snapshot", () => {
  const element = shallow(<Link />)
  expect(element).toMatchSnapshot()
})
