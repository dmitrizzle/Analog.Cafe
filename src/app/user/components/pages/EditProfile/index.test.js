import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import EditProfile from "./"

it("Render EditProfile without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<EditProfile />, store)
})
