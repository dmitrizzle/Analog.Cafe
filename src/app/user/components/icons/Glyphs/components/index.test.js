import { shallow } from "enzyme"
import React from "react"

import CapitalA from "./CapitalA"
import LowerA from "./LowerA"

it("Render CapitalA without crashing", () => {
  shallow(<CapitalA />)
})

it("Render LowerA without crashing", () => {
  shallow(<LowerA />)
})
