import { shallow } from "enzyme"
import React from "react"

import FollowButtons from "./FollowButtons"

it("Render FollowButtons without crashing", () => {
  shallow(<FollowButtons />)
})
