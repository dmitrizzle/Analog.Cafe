import { shallow } from "enzyme"
import React from "react"

import Spinner from "./"

it("Render Spinner without crashing", () => {
  shallow(<Spinner />)
})
