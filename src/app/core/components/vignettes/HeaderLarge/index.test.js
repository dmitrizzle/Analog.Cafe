import { shallow } from "enzyme"
import React from "react"

import HeaderLarge from "./"

it("Render HeaderLarge without crashing", () => {
  shallow(<HeaderLarge />)
})
