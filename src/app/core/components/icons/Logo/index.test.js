import { shallow } from "enzyme"
import React from "react"

import Logo from "./"

it("Render Logo without crashing", () => {
  shallow(<Logo />)
})
