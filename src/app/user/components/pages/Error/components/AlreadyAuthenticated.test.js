import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import AlreadyAuthenticated from "./AlreadyAuthenticated"

it("Render AlreadyAuthenticated, matches snapshot", () => {
  const element = shallow(<AlreadyAuthenticated />)
  expect(element).toMatchSnapshot()
})
