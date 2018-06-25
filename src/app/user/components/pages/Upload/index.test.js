import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import Upload from "./"

it("Render Upload without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Upload />, store)
})
