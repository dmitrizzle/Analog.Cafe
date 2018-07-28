import { shallow } from "enzyme"
import React from "react"
import "jest-styled-components"

import Spinner from "./"

it("Render Spinner, matches snapshot", () => {
  const element = shallow(<Spinner />)
  expect(element).toMatchSnapshot()
})
