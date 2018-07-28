import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import EditProfile from "./"

it("Render EditProfile, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<EditProfile />, store)
  expect(element).toMatchSnapshot()
})
