import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Me from "./"

it("Render Me, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Me />, store)
  expect(element).toMatchSnapshot()
})
