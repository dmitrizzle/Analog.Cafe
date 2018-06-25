import { createMockStore } from "redux-test-utils"
import { shallow } from "enzyme"
import { shallowWithStore } from "enzyme-redux"
import React from "react"

import ComposerByline from "./ComposerByline"
import ComposerWrapper from "./ComposerWrapper"
import DraftStatusText from "./DraftStatusText"
import Editor from "./Editor"
import TitleCreator from "./TitleCreator"

it("Render ComposerByline without crashing", () => {
  shallow(
    <ComposerByline
      user={{
        info: {
          role: "contributor"
        }
      }}
    />
  )
})

it("Render ComposerWrapper without crashing", () => {
  shallow(<ComposerWrapper />)
})

it("Render DraftStatusText without crashing", () => {
  shallow(<DraftStatusText />)
})

it("Render Editor without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<Editor />, store)
})

it("Render TitleCreator without crashing", () => {
  const store = createMockStore()
  shallowWithStore(<TitleCreator />, store)
})
