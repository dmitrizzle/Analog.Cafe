import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import SignIn from "./"

it("Render SignIn, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<SignIn />, store)
  expect(element).toMatchSnapshot()
})
