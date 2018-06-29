import { shallow } from "enzyme"
import React from "react"

import ArticleControls from "./"

it("Render ArticleControls without crashing", () => {
  shallow(<ArticleControls />)
})
