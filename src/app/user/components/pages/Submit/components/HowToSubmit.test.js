import { shallow } from "enzyme"
import React from "react"
import "jest-styled-components"

import HowToSubmit from "./HowToSubmit"

it("Render HowToSubmit, matches snapshot", () => {
  const element = shallow(<HowToSubmit />)
  expect(element).toMatchSnapshot()
})
