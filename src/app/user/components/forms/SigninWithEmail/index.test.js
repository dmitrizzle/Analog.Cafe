import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import SigninWithEmail from "./"

it("Render SigninWithEmail, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<SigninWithEmail />, store)
  expect(element).toMatchSnapshot()
})
