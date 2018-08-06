import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import RestoreComposerBackup from "./"

it("Render RestoreComposerBackup, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<RestoreComposerBackup />, store)
  expect(element).toMatchSnapshot()
})
