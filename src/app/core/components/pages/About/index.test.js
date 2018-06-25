import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import About from "./"

it("Render About without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<About />, store)
})
