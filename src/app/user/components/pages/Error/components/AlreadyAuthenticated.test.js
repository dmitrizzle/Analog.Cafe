import { shallow } from "enzyme"
import React from "react"

import AlreadyAuthenticated from "./AlreadyAuthenticated"

it("Render AlreadyAuthenticated without crashing", () => {
  shallow(<AlreadyAuthenticated />)
})
