import { shallow } from "enzyme"
import React from "react"

import ZigZag from "./"

it("Render ZigZag without crashing", () => {
  shallow(<ZigZag />)
})
