import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import List from "./"

it("Render List, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<List />, store)
  expect(element).toMatchSnapshot()
})
