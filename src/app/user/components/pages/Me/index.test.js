import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Me from "./"

it("Render Me without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Me />, store)
})
