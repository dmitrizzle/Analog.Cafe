import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Forbidden from "./Forbidden"
import NotFound from "./NotFound"

it("Render Forbidden, matches snapshot", () => {
  const element = shallow(<Forbidden />)
  expect(element).toMatchSnapshot()
})

it("Render NotFound, matches snapshot", () => {
  const element = shallow(
    <NotFound
      history={{
        replace: () => {}
      }}
    />
  )
  expect(element).toMatchSnapshot()
})
