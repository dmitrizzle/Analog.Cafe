import { shallow } from "enzyme"
import React from "react"

import Facebook from "./Facebook"
import Instagram from "./Instagram"
import Twitter from "./Twitter"

it("Render Facebook without crashing", () => {
  shallow(<Facebook />)
})

it("Render Instagram without crashing", () => {
  shallow(<Instagram />)
})

it("Render Twitter without crashing", () => {
  shallow(<Twitter />)
})
