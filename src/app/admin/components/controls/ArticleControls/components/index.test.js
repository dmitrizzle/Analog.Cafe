import "jest-styled-components"

import { shallow } from "enzyme"
import React from "react"

import EditorialControls from "./EditorialControls"
import PublishControls from "./PublishControls"
import StatusExplanation from "./StatusExplanation"

it("Render PublishControls without crashing, matches snapshot", () => {
  const element = shallow(
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
  expect(element).toMatchSnapshot()
})

it("Render EditorialControls without crashing, matches snapshot", () => {
  const element = shallow(
    <EditorialControls
      article={{
        status: "published"
      }}
    />
  )
  expect(element).toMatchSnapshot()
})

it("Render StatusExplanation without crashing, matches snapshot", () => {
  const element = shallow(
    <StatusExplanation article={{ status: "scheduled" }} />
  )
  expect(element).toMatchSnapshot()
})
