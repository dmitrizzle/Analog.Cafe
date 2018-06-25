import { shallow } from "enzyme"
import React from "react"

import ContactInfo from "./"

it("Render ContactInfo without crashing", () => {
  shallow(<ContactInfo />)
})
