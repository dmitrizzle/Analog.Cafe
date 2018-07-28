import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Facebook from "./Facebook"
import Instagram from "./Instagram"
import Twitter from "./Twitter"

it("Render Facebook, matches snapshot", () => {
  const element = shallow(<Facebook />)
  expect(element).toMatchSnapshot()
})

it("Render Instagram, matches snapshot", () => {
  const element = shallow(<Instagram />)
  expect(element).toMatchSnapshot()
})

it("Render Twitter, matches snapshot", () => {
  const element = shallow(<Twitter />)
  expect(element).toMatchSnapshot()
})
