import { shallow } from "enzyme"
import React from "react"

import Options from "./Options"

it("Render Options without crashing", () => {
  shallow(<Options />)
})
