import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import List from "./"

it("Render List without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<List />, store)
})
