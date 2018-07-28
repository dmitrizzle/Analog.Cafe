import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import ContactInfo from "./"

it("Render ContactInfo, matches snapshot", () => {
  const element = shallow(<ContactInfo />)
  expect(element).toMatchSnapshot()
})
