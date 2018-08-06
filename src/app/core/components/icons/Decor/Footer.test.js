import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Footer from "./Footer"

it("Render Footer, matches snapshot", () => {
  const element = shallow(<Footer />)
  expect(element).toMatchSnapshot()
})
