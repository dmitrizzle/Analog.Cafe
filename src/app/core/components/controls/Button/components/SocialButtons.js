import React from "react"
import styled, { css } from "styled-components"

import Facebook from "../../../icons/group-social/Facebook"
import LinkButton from "./LinkButton"
import Twitter from "../../../icons/group-social/Twitter"

export const brandButtonStyles = css`
  svg {
    height: 2em;
  }
  color: #fff !important;
`

export const twitterButtonStyles = css`
  svg {
    margin: -1.25em 0.25em -1em -1.5em;
  }
  background: #1da1f2;
`
const facebookButtonStyles = css`
  svg {
    margin: -1.25em 0 -1em -1em;
    border-radius: 0.25em;
  }
  background: #4267b2;
`

const StyledTwitterLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${twitterButtonStyles}`
const StyledFacebookLinkButton = styled(
  LinkButton
)`${brandButtonStyles}${facebookButtonStyles}`

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
