import { shallow } from "enzyme"
import React from "react"

import Submit from "./Submit"

it("Render Submit routes without crashing", () => {
  shallow(<Submit />)
})
