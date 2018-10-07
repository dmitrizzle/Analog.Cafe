import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import { APP_THEME } from "../../../../../../constants"
import HighlightMenu, { MenuItem, Menu } from "./HighlightMenu"

it("Render HighlightMenu without crashing, matches snapshot", () => {
  const element = shallow(
    <HighlightMenu selection={{ hidden: false, topOffset: 0, leftOffset: 0 }} />
  )
  expect(element).toMatchSnapshot()
})
it("Render MenuItem without crashing, matches snapshot", () => {
  const element = shallow(<MenuItem theme={APP_THEME} />)
  expect(element).toMatchSnapshot()
})
it("Render Menu without crashing, matches snapshot", () => {
  const element = shallow(<Menu theme={APP_THEME} />)
  expect(element).toMatchSnapshot()
})
