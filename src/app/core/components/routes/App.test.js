import { shallow } from "enzyme"
import React from "react"

import App from "./App.js"

it("Render routes App without crashing", () => {
  shallow(<App />)
})
