import { shallow } from "enzyme"
import React from "react"

import Card from "./"

it("Render Card without crashing", () => {
  shallow(<Card />)
})
