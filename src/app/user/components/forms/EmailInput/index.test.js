import { shallow } from "enzyme"
import React from "react"

import EmailInput from "./"

it("Render EmailInput without crashing", () => {
  shallow(<EmailInput />)
})
