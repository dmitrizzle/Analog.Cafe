// tools
import React from "react"
import Link from "../Link"

export const SubscribeToWeekly = props => {
  return (
    <span>
      A neat summary (<Link
        onClick={() => {
          // async load Google Analytics module
          import("react-ga").then(ReactGA => {
            ReactGA.event({
              category: "Campaign",
              action: "ActionsCard.subscribe_example"
            })
          })
        }}
        to="https://us4.campaign-archive.com/?u=256339f7eafa36f2f466aca44&id=434dbe7e2b"
      >
        example
      </Link>) is sent out every Tuesday. To get it, fill out your email below
      and click “Submit <span style={{ fontStyle: "normal" }}>❤︎</span>.” We
      never share or sell your personal information.
    </span>
  )
}
