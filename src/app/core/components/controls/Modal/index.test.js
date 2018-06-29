import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Modal from "./"

it("Render Modal without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Modal />, store)
})
