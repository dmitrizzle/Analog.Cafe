import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import PrivacySettings from "./"

it("Render PrivacySettings, matches snapshot", () => {
  const element = shallow(<PrivacySettings />)
  expect(element).toMatchSnapshot()
})
