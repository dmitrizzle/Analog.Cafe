import { createMockStore } from "redux-test-utils"
import { shallow } from "enzyme"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import ModalCard from "./ModalCard"
import ModalOverlay from "./ModalOverlay"

it("Render ModalOverlay without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<ModalOverlay />, store)
})

it("Render ModalCard without crashing", () => {
  shallow(<ModalCard />)
})
