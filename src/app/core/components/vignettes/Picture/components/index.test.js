import { shallow } from "enzyme"
import React from "react"

import Figcaption from "./Figcaption"
import Figure from "./Figure"
import ImageSet from "./ImageSet"
import Placeholder from "./Placeholder"

it("Render Figcaption without crashing", () => {
  shallow(<Figcaption />)
})

it("Render Figure without crashing", () => {
  shallow(<Figure />)
})

it("Render ImageSet without crashing", () => {
  shallow(<ImageSet />)
})

it("Render Placeholder without crashing", () => {
  shallow(<Placeholder />)
})
