// tools
import React from "react"
import styled, { css } from "styled-components"

// components
import { LinkButton } from "../../Button"
import Twitter from "../../../_icons/Twitter"
import Facebook from "../../../_icons/Facebook"
import Instagram from "../../../_icons/Instagram"

// css
const brandButtonStyles = css`
  color: ${props => props.theme.color.background} !important;
  svg {
    height: 2em;
  }
`
const twitterButtonStyles = css`
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

// styled button links
const StyledTwitterLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${twitterButtonStyles}`
const StyledFacebookLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${facebookButtonStyles}`
const StyledInstagramLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${instagramButtonStyles}`

export const TwitterLinkButton = props => {
  return (
    <StyledTwitterLinkButton {...props}>
      <Twitter />
      &nbsp;{props.children}
    </StyledTwitterLinkButton>
  )
}
export const FacebookLinkButton = props => {
  return (
    <StyledFacebookLinkButton {...props}>
      <Facebook />
      &nbsp;{props.children}
    </StyledFacebookLinkButton>
  )
}
export const InstagramLinkButton = props => {
  return (
    <StyledInstagramLinkButton {...props}>
      <Instagram />
      &nbsp;&nbsp;{props.children}
    </StyledInstagramLinkButton>
  )
}
