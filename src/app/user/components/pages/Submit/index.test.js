import { shallow } from "enzyme"
import React from "react"

import Submit from "./"

it("Render Submit without crashing", () => {
  shallow(<Submit />)
})
