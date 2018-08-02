import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallow } from "enzyme"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import ModalCard from "./ModalCard"
import ModalOverlay, { modalScrollCallback } from "./ModalOverlay"

it("Render ModalOverlay, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<ModalOverlay />, store)
  expect(element).toMatchSnapshot()
})

it("Render ModalCard, matches snapshot", () => {
  const element = shallow(<ModalCard />)
  expect(element).toMatchSnapshot()
})

it("modalScrollCallback function returns null if the target isn't fully scrolled up", () => {
  const callback = () => {}
  expect(
    modalScrollCallback(
      { scrollTop: 1, scrollHeight: 100, clientHeight: 20 },
      callback
    )
  ).toEqual(null)
})

it("modalScrollCallback function returns callback if the target is fully scrolled up", () => {
  const callback = () => "callback"
  expect(
    modalScrollCallback(
      { scrollTop: 80, scrollHeight: 100, clientHeight: 20 },
      callback
    )
  ).toEqual("callback")
})
