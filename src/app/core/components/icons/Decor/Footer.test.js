import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import FooterDecor from "./"

it("Render FooterDecor, matches snapshot", () => {
  const element = shallow(<FooterDecor />)
  expect(element).toMatchSnapshot()
})
