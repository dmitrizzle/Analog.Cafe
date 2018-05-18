import React from "react"

import {
  FacebookLinkButton,
  TwitterLinkButton
} from "../../Button/components/SocialButtons"
import Button from "../../Button/components/Button"
import CardIntegrated from "../../Card/components/CardIntegrated"
import Subscribe from "../../../../../user/components/forms/Subscribe"

export default props => {
  return (
    <CardIntegrated>
      <Subscribe
        subscribeFormCallback={props.subscribeFormCallback}
        stateOverwrite={props.subscribeForm}
      />

      {props.shareButtons ? (
        <FacebookLinkButton
          to="https://facebook.com/analog8cafe"
          onClick={event => {
            props.shareOnFacebook(event, props)
            import("react-ga").then(ReactGA => {
              ReactGA.event({
                category: "Campaign",
                action: "ActionsCard.share_facebook"
              })
            })
          }}
        >
          Share&nbsp;
        </FacebookLinkButton>
      ) : null}
      {props.shareButtons ? (
        <TwitterLinkButton
          to="https://twitter.com/analog_cafe"
          onClick={event => {
            props.shareOnTwitter(event, props)
            import("react-ga").then(ReactGA => {
              ReactGA.event({
                category: "Campaign",
                action: "ActionsCard.share_twitter"
              })
            })
          }}
        >
          Tweet
        </TwitterLinkButton>
      ) : null}

      {!props.hideShareButtons && (
        <Button onClick={props.revealShareButtons} inverse={props.shareButtons}>
          Share <span style={{ display: "inline-block" }}>❀</span>
        </Button>
      )}
    </CardIntegrated>
  )
}
