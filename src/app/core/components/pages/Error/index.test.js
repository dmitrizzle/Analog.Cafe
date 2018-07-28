import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Error from "./"

it("Render Error, matches snapshot", () => {
  const element = shallow(<Error />)
  expect(element).toMatchSnapshot()
})
