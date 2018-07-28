import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import EmailInput from "./"

it("Render EmailInput, matches snapshot", () => {
  const element = shallow(<EmailInput />)
  expect(element).toMatchSnapshot()
})
