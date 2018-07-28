import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import About from "./"

it("Render About, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<About />, store)
  expect(element).toMatchSnapshot()
})
