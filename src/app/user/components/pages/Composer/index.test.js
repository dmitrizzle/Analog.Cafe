import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Composer from "./"

it("Render Composer, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Composer />, store)
  expect(element).toMatchSnapshot()
})
