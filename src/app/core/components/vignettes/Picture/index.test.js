import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Picture from "./"

it("Render Picture without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Picture />, store)
})
