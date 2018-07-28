import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import SignOut from "./"

it("Render SignOut, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<SignOut />, store)
  expect(element).toMatchSnapshot()
})
