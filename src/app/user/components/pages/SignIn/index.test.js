import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import SignIn from "./"

it("Render SignIn without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<SignIn />, store)
})
