import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import SigninWithEmail from "./"

it("Render SigninWithEmail without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<SigninWithEmail />, store)
})
