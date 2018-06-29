import { shallow } from "enzyme"
import React from "react"

import HowToSubmit from "./HowToSubmit"

it("Render HowToSubmit without crashing", () => {
  shallow(<HowToSubmit />)
})
