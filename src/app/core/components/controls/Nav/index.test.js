import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Nav from "./"

it("Render Nav without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Nav />, store)
})
