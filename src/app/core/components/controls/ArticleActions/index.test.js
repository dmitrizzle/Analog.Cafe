import { shallow } from "enzyme"
import React from "react"
import "jest-styled-components"

import ArticleActions from "./"

it("Render ArticleActions, matches snapshot", () => {
  const element = shallow(<ArticleActions />)
  expect(element).toMatchSnapshot()
})
