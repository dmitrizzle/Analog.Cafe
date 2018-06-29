import { shallow } from "enzyme"
import React from "react"

import Forbidden from "./Forbidden"
import NotFound from "./NotFound"

it("Render Forbidden without crashing", () => {
  shallow(<Forbidden />)
})

it("Render NotFound without crashing", () => {
  shallow(
    <NotFound
      history={{
        replace: () => {}
      }}
    />
  )
})
