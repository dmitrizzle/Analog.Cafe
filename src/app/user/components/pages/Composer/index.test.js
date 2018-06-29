import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Composer from "./"

it("Render Composer without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Composer />, store)
})
