import { shallow } from "enzyme"
import React from "react"

import App from "./app"

it("Render App without crashing", () => {
  shallow(<App />)
})
