import { shallow } from "enzyme"
import React from "react"

import Link from "./"

it("Render Link without crashing", () => {
  shallow(<Link />)
})
