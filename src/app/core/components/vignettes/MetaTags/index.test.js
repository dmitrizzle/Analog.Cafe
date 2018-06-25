import { shallow } from "enzyme"
import React from "react"

import MetaTags from "./"

it("Render MetaTags without crashing", () => {
  shallow(<MetaTags />)
})
