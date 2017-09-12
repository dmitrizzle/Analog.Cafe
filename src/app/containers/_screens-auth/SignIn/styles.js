// tools
import React from "react"
import styled, { css } from "styled-components"

// components
import { Button } from "../../../components/Button"
import Twitter from "../../../components/_icons/components/Twitter"

// css
const brandButtonStyles = css`
  color: ${props => props.theme.color.background} !important;
  svg {
    height: 2em;
  }
`
const StyledTwitterButton = styled(Button)`
  background-color: #1da1f2;
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
