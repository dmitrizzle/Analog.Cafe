import { shallow } from "enzyme"
import React from "react"

import Subscribe from "./"

it("Render Subscribe without crashing", () => {
  shallow(<Subscribe />)
})
