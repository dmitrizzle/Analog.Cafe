import { shallow } from "enzyme"
import React from "react"

import EditorialControls from "./EditorialControls"
import PublishControls from "./PublishControls"
import StatusExplanation from "./StatusExplanation"

it("Render PublishControls without crashing", () => {
  shallow(
    <PublishControls
      editor={{
        publish: {
          id: 0
        }
      }}
      article={{
        id: 0
      }}
    />
  )
})

it("Render EditorialControls without crashing", () => {
  shallow(
    <EditorialControls
      article={{
        status: "published"
      }}
    />
  )
})

it("Render StatusExplanation without crashing", () => {
  shallow(<StatusExplanation article={{ status: "scheduled" }} />)
})
