import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Email from "./"

it("Render Email, matches snapshot", () => {
  const element = shallow(<Email />)
  expect(element).toMatchSnapshot()
})
