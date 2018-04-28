import React from "react"

import { CardFlattened } from "../../Card/styles"
import {
  FacebookLinkButton,
  InstagramLinkButton,
  TwitterLinkButton
} from "../../Button/components/SocialButtons"

export default props => {
  return (
    <CardFlattened>
      <TwitterLinkButton
        to="https://twitter.com/analog_cafe"
        onClick={() => {
          import("react-ga").then(ReactGA => {
            ReactGA.event({
              category: "Campaign",
              action: "ActionsCard.follow_twitter"
            })
          })
        }}
      >
        Follow on Twitter
      </TwitterLinkButton>

      <FacebookLinkButton
        to="https://facebook.com/analog8cafe"
        onClick={() => {
          import("react-ga").then(ReactGA => {
            ReactGA.event({
              category: "Campaign",
              action: "ActionsCard.follow_facebook"
            })
          })
        }}
      >
        Follow on Facebook
      </FacebookLinkButton>

      <InstagramLinkButton
        to="https://instagram.com/analog_cafe"
        onClick={() => {
          import("react-ga").then(ReactGA => {
            ReactGA.event({
              category: "Campaign",
              action: "ActionsCard.follow_instagram"
            })
          })
        }}
      >
        Follow on Instagram
      </InstagramLinkButton>
    </CardFlattened>
  )
}
