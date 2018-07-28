import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import SignInInfo from "./SignInInfo"

it("Render SignInInfo, matches snapshot", () => {
  const element = shallow(<SignInInfo stateSessionInfo={{}} />)
  expect(element).toMatchSnapshot()
})
