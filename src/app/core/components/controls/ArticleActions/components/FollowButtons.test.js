import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import FollowButtons from "./FollowButtons"

it("Render FollowButtons without crashing, matches snapshot", () => {
  const element = shallow(<FollowButtons />)
  expect(element).toMatchSnapshot()
})
