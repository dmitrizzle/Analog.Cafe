import "jest-styled-components"

import { createMockStore } from "redux-test-utils"
import { shallow } from "enzyme"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import ComposerByline from "./ComposerByline"
import ComposerWrapper from "./ComposerWrapper"
import DraftStatusText from "./DraftStatusText"
import Editor from "./Editor"
import TitleCreator from "./TitleCreator"

it("Render ComposerByline, matches snapshot", () => {
  const element = shallow(
    <ComposerByline
      user={{
        info: {
          role: "contributor"
        }
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

it("Render ComposerWrapper, matches snapshot", () => {
  const element = shallow(<ComposerWrapper />)
  expect(element).toMatchSnapshot()
})

it("Render DraftStatusText, matches snapshot", () => {
  const element = shallow(<DraftStatusText />)
  expect(element).toMatchSnapshot()
})

it("Render Editor, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<Editor />, store)
  expect(element).toMatchSnapshot()
})

it("Render TitleCreator, matches snapshot", () => {
  const store = createMockStore()
  const element = shallowWithStore(<TitleCreator />, store)
  expect(element).toMatchSnapshot()
})
