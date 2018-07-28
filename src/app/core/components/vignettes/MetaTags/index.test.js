import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import MetaTags from "./"

it("Render MetaTags, matches snapshot", () => {
  const element = shallow(<MetaTags />)
  expect(element).toMatchSnapshot()
})
