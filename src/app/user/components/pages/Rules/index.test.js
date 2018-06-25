import { shallow } from "enzyme"
import React from "react"

import Rules from "./"

it("Render Rules without crashing", () => {
  shallow(<Rules />)
})
