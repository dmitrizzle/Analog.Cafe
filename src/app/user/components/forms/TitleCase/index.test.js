import { shallow } from "enzyme"
import React from "react"

import TitleCase from "./"

it("Render TitleCase without crashing", () => {
  shallow(<TitleCase inputDesignation="title" />)
  shallow(<TitleCase inputDesignation="subtitle" />)
})
