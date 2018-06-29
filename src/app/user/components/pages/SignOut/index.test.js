import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import SignOut from "./"

it("Render SignOut without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<SignOut />, store)
})
