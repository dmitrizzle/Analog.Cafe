import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import ImageAdmin from "./ImageAdmin"
import UserAdmin from "./UserAdmin"

it("Render UserAdmin without crashing, matches snapshot", () => {
  const element = shallow(
    <UserAdmin
      rowIndex={[0]}
      admin={{
        accountList: {
          status: "loading",
          items: [{ id: 0 }]
        }
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

it("Render ImageAdmin without crashing, matches snapshot", () => {
  const element = shallow(
    <ImageAdmin
      stateImageList={{ options: { featured: false, fullConsent: false } }}
      rowIndex={[0]}
      imagelib={{
        status: "loading",
        items: [{ id: 0 }]
      }}
    />
  )
  expect(element).toMatchSnapshot()
})
