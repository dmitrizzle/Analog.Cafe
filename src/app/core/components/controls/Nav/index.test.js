import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Nav from "./"

it("Render Nav, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Nav />, store)
  expect(element).toMatchSnapshot()
})
