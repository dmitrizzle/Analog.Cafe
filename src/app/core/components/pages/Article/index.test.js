import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Article from "./"

it("Render Article without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Article />, store)
})
