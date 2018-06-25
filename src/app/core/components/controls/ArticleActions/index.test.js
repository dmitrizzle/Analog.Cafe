import { shallow } from "enzyme"
import React from "react"

import ArticleActions from "./"

it("Render ArticleActions without crashing", () => {
  shallow(<ArticleActions />)
})
