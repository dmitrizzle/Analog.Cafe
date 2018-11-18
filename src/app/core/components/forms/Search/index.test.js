import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Search from "./"

it("Render Search, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Search />, store)
  expect(element).toMatchSnapshot()
})
