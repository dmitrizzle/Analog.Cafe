import { shallow } from "enzyme"
import React from "react"

import PrivacyPolicy from "./"

it("Render PrivacyPolicy without crashing", () => {
  shallow(<PrivacyPolicy />)
})
