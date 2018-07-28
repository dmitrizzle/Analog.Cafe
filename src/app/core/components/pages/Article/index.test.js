import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Article from "./"

it("Render Article, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Article />, store)
  expect(element).toMatchSnapshot()
})
