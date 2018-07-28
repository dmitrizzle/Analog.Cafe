import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import Figcaption from "./Figcaption"
import Figure from "./Figure"
import ImageSet from "./ImageSet"
import Placeholder from "./Placeholder"

it("Render Figcaption, matches snapshot", () => {
  const element = shallow(<Figcaption />)
  expect(element).toMatchSnapshot()
})

it("Render Figure, matches snapshot", () => {
  const element = shallow(<Figure />)
  expect(element).toMatchSnapshot()
})

it("Render ImageSet, matches snapshot", () => {
  const element = shallow(<ImageSet />)
  expect(element).toMatchSnapshot()
})

it("Render Placeholder, matches snapshot", () => {
  const element = shallow(<Placeholder />)
  expect(element).toMatchSnapshot()
})
