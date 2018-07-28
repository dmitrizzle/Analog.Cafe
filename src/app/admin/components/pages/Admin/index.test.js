import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Admin from "./"

it("Render Admin without crashing, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Admin />, store)
  expect(element).toMatchSnapshot()
})
