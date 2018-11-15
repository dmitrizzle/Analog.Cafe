import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import MailChimpPrefill from "./MailChimpPrefill"

it("Render MailChimpPrefill, matches snapshot", () => {
  const element = shallow(<MailChimpPrefill />)
  expect(element).toMatchSnapshot()
})
