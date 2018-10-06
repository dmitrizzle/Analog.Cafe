import React from "react"
import styled, { css } from "styled-components"

import Facebook from "../../../icons/Social/components/Facebook"
import Feedly from "../../../icons/Social/components/Feedly"
import Instagram from "../../../icons/Social/components/Instagram"
import LinkButton from "./LinkButton"
import Twitter from "../../../icons/Social/components/Twitter"

export const brandButtonStyles = css`
  color: ${props => props.theme.color.background()} !important;
  svg {
    height: 2em;
  }
`
const feedlyButtonStyles = css`
  svg {
    margin: -1em 0.25em -1.25em -1.5em;
    height: 2em;
  }
`
export const twitterButtonStyles = css`
  background-color: #1da1f2;
  svg {
    margin: -1.25em 0.25em -1em -1.5em;
  }
`
const facebookButtonStyles = css`
  background-color: #3b5998;
  svg {
    margin: -1.25em 0 -1em -1em;
  }
`
const instagramButtonStyles = css`
  background-color: #e1306c;
  svg {
    margin: -1.25em 0 -1em -0.25em;
    height: 1.5em;
  }
`

const StyledFeedlyLinkButton = styled(LinkButton)`
  ${feedlyButtonStyles};
`
const StyledTwitterLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${twitterButtonStyles}`
const StyledFacebookLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${facebookButtonStyles}`
const StyledInstagramLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${instagramButtonStyles}`

export const FeedlyLinkButton = props => {
  return (
    <StyledFeedlyLinkButton {...props} inverse>
      <Feedly />
      &nbsp;
      {props.children}
    </StyledFeedlyLinkButton>
  )
}
export const TwitterLinkButton = props => {
  return (
    <StyledTwitterLinkButton {...props}>
      <Twitter />
      &nbsp;
      {props.children}
    </StyledTwitterLinkButton>
  )
}
export const FacebookLinkButton = props => {
  return (
    <StyledFacebookLinkButton {...props}>
      <Facebook />
      &nbsp;
      {props.children}
    </StyledFacebookLinkButton>
  )
}
export const InstagramLinkButton = props => {
  return (
    <StyledInstagramLinkButton {...props}>
      <Instagram />
      &nbsp;&nbsp;
      {props.children}
    </StyledInstagramLinkButton>
  )
}
