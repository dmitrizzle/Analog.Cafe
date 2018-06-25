import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Admin from "./"

it("Render Admin without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Admin />, store)
})
