import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import PictureMenu from "./"

it("Render PictureMenu, matches snapshot", () => {
  const element = shallow(<PictureMenu />)
  expect(element).toMatchSnapshot()
})
