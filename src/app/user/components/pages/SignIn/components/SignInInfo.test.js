import { shallow } from "enzyme"
import React from "react"

import SignInInfo from "./SignInInfo"

it("Render SignInInfo without crashing", () => {
  shallow(<SignInInfo stateSessionInfo={{}} />)
})
