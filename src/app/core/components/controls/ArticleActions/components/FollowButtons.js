import React from "react"

import {
  FacebookLinkButton,
  FeedlyLinkButton,
  InstagramLinkButton,
  TwitterLinkButton
} from "../../Button/components/SocialButtons"
import { GA } from "../../../../../utils"
import CardIntegrated from "../../Card/components/CardIntegrated"

export default props => {
  return (
    <CardIntegrated>
      <FeedlyLinkButton
        to="http://bit.ly/FeedAnalog"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "ActionsCard.follow_feedly"
          })
        }}
      >
        Follow on Feedly
      </FeedlyLinkButton>

      <TwitterLinkButton
        to="https://twitter.com/analog_cafe"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "ActionsCard.follow_twitter"
          })
        }}
      >
        Follow on Twitter
      </TwitterLinkButton>

      <FacebookLinkButton
        to="https://facebook.com/analog8cafe"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "ActionsCard.follow_facebook"
          })
        }}
      >
        Follow on Facebook
      </FacebookLinkButton>

      <InstagramLinkButton
        to="https://instagram.com/analog_cafe"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "ActionsCard.follow_instagram"
          })
        }}
      >
        Follow on Instagram
      </InstagramLinkButton>
    </CardIntegrated>
  )
}
