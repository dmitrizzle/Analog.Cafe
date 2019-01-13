import React from "react"
import styled, { css } from "styled-components"

import Facebook from "../../../icons/Social/components/Facebook"
import LinkButton from "./LinkButton"
import Twitter from "../../../icons/Social/components/Twitter"

export const brandButtonStyles = css`
  svg {
    height: 2em;
  }
`
// const feedlyButtonStyles = css`
//   svg {
//     margin: -1em 0.25em -1.25em -1.5em;
//     height: 2em;
//     path {
//       fill: #2bb24c !important;
//       stroke: transparent;
//     }
//   }
// `;
export const twitterButtonStyles = css`
  svg {
    margin: -1.25em 0.25em -1em -1.5em;
    path {
      fill: #1da1f2 !important;
    }
  }
`
const facebookButtonStyles = css`
  svg {
    margin: -1.25em 0 -1em -1em;
    background: #3b5998;
    border-radius: 0.25em;
  }
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
