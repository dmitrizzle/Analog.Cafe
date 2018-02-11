// tools
import React from "react"
import Link from "../_controls/Link"

export const SubscribeToWeekly = props => {
  return (
    <span>
      We send a lovely update (<Link
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
        like this
      </Link>) every Tuesday to the special few. To get it, fill out your email
      below and click “{props.buttonTextNoIcon
        ? props.buttonTextNoIcon
        : "Submit"}{" "}
      <span style={{ fontStyle: "normal" }}>❤︎</span>.” We never share or sell
      your personal information.
    </span>
  )
}

export const Email = () => {
  return (
    <strong style={{ display: "inline-block" }}>
      d<span style={{ fontStyle: "normal" }} role="img" aria-label="Envelope">
        📨
      </span>analog.cafe
    </strong>
  )
}
