import { shallow } from "enzyme"
import React from "react"

import PictureMenu from "./"

it("Render PictureMenu without crashing", () => {
  shallow(<PictureMenu />)
})
