import React from "react"
import styled, { css } from "styled-components"

// components
import { Button } from "../../../components/_controls/Button"
import Twitter from "../../../components/_icons/Social/components/Twitter"
import Facebook from "../../../components/_icons/Social/components/Facebook"

// css
const brandButtonStyles = css`
  color: ${props => props.theme.color.background()} !important;
  svg {
    height: 2em;
  }
`
const StyledTwitterButton = styled(Button)`
  background-color: #1da1f2;
  ${brandButtonStyles} svg {
    margin: -1.25em 0.25em -1em -1.5em;
  }
`
const StyledFacebookButton = styled(Button)`
  background-color: #3b5998;
  ${brandButtonStyles} svg {
    margin: -1.25em 0 -1em -1em;
  }
`

export const TwitterButton = props => {
  return (
    <StyledTwitterButton onClick={props.onClick}>
      <Twitter />
      &nbsp;{props.children}
    </StyledTwitterButton>
  )
}
export const FacebookButton = props => {
  return (
    <StyledFacebookButton onClick={props.onClick}>
      <Facebook />
      &nbsp;{props.children}
    </StyledFacebookButton>
  )
}
