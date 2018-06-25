import { shallow } from "enzyme"
import React from "react"

import ImageAdmin from "./ImageAdmin"
import UserAdmin from "./UserAdmin"

it("Render UserAdmin without crashing", () => {
  shallow(
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
})

it("Render ImageAdmin without crashing", () => {
  shallow(
    <ImageAdmin
      stateImageList={{ options: { featured: false, fullConsent: false } }}
      rowIndex={[0]}
      imagelib={{
        status: "loading",
        items: [{ id: 0 }]
      }}
    />
  )
})
