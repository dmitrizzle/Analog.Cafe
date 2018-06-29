import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import RestoreComposerBackup from "./"

it("Render RestoreComposerBackup without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<RestoreComposerBackup />, store)
})
