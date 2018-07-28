import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import ThankYouList from "./ThankYouList"

it("Render ThankYouList, matches snapshot", () => {
  const element = shallow(<ThankYouList />)
  expect(element).toMatchSnapshot()
})
