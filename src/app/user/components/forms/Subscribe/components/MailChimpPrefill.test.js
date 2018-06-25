import { shallow } from "enzyme"
import React from "react"

import MailChimpPrefill from "./MailChimpPrefill"

it("Render MailChimpPrefill without crashing", () => {
  shallow(<MailChimpPrefill />)
})
