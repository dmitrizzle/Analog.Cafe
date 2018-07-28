import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Upload from "./"

it("Render Upload, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Upload />, store)
  expect(element).toMatchSnapshot()
})
