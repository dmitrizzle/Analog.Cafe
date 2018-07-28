import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Picture from "./"

it("Render Picture, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Picture />, store)
  expect(element).toMatchSnapshot()
})
