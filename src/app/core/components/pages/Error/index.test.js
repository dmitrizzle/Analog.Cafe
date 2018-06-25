import { shallow } from "enzyme"
import React from "react"

import Error from "./"

it("Render Error without crashing", () => {
  shallow(<Error />)
})
