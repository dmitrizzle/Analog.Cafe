import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import TitleCase from "./"

it("Render TitleCase, matches snapshot", () => {
  const elementTitle = shallow(<TitleCase inputDesignation="title" />)
  const elementSubtitle = shallow(<TitleCase inputDesignation="subtitle" />)

  expect(elementTitle).toMatchSnapshot()
  expect(elementSubtitle).toMatchSnapshot()
})
