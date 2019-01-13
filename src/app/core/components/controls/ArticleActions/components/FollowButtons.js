import React from "react"
import styled, { css } from "styled-components"

import { GA } from "../../../../../utils"
import Feedly from "../../../icons/Social/components/Feedly"
import Instagram from "../../../icons/Social/components/Instagram"
import LinkButton from "../../Button/components/LinkButton"
import Twitter from "../../../icons/Social/components/Twitter"

export const FollowButtons = styled.div`
  text-align: center;
  background: ${props => props.theme.color.background()};
  padding: 0.5em 0 0;
  box-shadow: 0 1px 1px rgba(44, 44, 44, 0.25),
    0 0 0 1px rgba(44, 44, 44, 0.125);

  svg {
    height: 2em;
  }
`
export const FollowButton = css`
  padding: 0;
  box-shadow: none;
  margin: 0;
  display: inline-block;
  background: transparent;
  width: 3em;
  height: 2em;
  &:active {
    background: #fff !important;
  }
  svg path {
    fill: #999 !important;
    stroke: transparent;
  }
`
const FeedlyButton = styled(LinkButton)`
  ${FollowButton};
`
const TwitterButton = styled(LinkButton)`
  ${FollowButton} svg {
    height: 2.65em;
    margin-top: -0.3em;
  }
`
const InstagramButton = styled(LinkButton)`
  ${FollowButton} svg {
    height: 1.4em;
    margin: -0.4em 0 0 0.2em;
  }
`
// const FacebookButton = styled(LinkButton)`
//   ${FollowButton} svg {
//     height: 1.4em;
//     margin: -0.4em 0 0 0.2em;
//     background: #999 !important;
//     border-radius: 0.25em;
//     path {
//       fill: #fff !important;
//     }
//   }
// `;

export default props => {
  return (
    <FollowButtons>
      <FeedlyButton
        to="http://bit.ly/FeedAnalog"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "FollowButtons.follow_feedly"
          })
        }}
      >
        <Feedly />
      </FeedlyButton>
      <TwitterButton
        to="https://twitter.com/analog_cafe"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "FollowButtons.follow_twitter"
          })
        }}
      >
        <Twitter />
      </TwitterButton>
      <InstagramButton
        to="https://instagram.com/analog_cafe"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "FollowButtons.follow_instagram"
          })
        }}
      >
        <Instagram />
      </InstagramButton>

      {/* <FacebookButton
        to="https://facebook.com/analog8cafe"
        onClick={() => {
          GA.event({
            category: "Campaign",
            action: "FollowButtons.follow_facebook"
          });
        }}
      >
        <Facebook />
      </FacebookButton> */}
    </FollowButtons>
  )
}
