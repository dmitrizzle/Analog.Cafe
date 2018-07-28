import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import PrivacyPolicy from "./"

it("Render PrivacyPolicy, matches snapshot", () => {
  const element = shallow(<PrivacyPolicy />)
  expect(element).toMatchSnapshot()
})
