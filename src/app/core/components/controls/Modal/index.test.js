import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Modal from "./"

it("Render Modal, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Modal />, store)
  expect(element).toMatchSnapshot()
})
