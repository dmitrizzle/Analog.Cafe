import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallow } from "enzyme"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import ModalCard from "./ModalCard"
import ModalOverlay from "./ModalOverlay"

it("Render ModalOverlay, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<ModalOverlay />, store)
  expect(element).toMatchSnapshot()
})

it("Render ModalCard, matches snapshot", () => {
  const element = shallow(<ModalCard />)
  expect(element).toMatchSnapshot()
})
