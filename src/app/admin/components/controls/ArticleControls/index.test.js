import { shallow } from "enzyme"
import React from "react"
import "jest-styled-components"

import ArticleControls from "./"

it("Render ArticleControls without crashing, matches snapshot", () => {
  const element = shallow(<ArticleControls />)
  expect(element).toMatchSnapshot()
})
