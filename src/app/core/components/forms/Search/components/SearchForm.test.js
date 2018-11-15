import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import SearchForm from "./SearchForm"

it("Render SearchForm, matches snapshot", () => {
  const element = shallow(<SearchForm />)
  expect(element).toMatchSnapshot()
})
