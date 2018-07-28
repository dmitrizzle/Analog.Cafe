import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Card from "./"

it("Render Card, matches snapshot", () => {
  const element = shallow(<Card />)
  expect(element).toMatchSnapshot()
})
