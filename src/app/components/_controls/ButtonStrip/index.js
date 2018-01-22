// tools
import React from "react"
import styled, { css } from "styled-components"

// components
import { TinyButton } from "../Button"

export const ButtonStrip = styled.div`
  & > div {
    display: flex;
    margin: 0;
  }
  width: 10em;
`

const tinyButtonBorderRadious = css`
  ${props => props.theme.effects.borderRadius.small};
`
export const Item = styled(({ left, right, script, ...props }) => (
  <TinyButton {...props} />
))`
  margin: 0;

  border-top-left-radius: ${props =>
    props.left ? `${tinyButtonBorderRadious}em` : 0};
  border-bottom-left-radius: ${props =>
    props.left ? `${tinyButtonBorderRadious}em` : 0};

  border-top-right-radius: ${props =>
    props.right ? `${tinyButtonBorderRadious}em` : 0};
  border-bottom-right-radius: ${props =>
    props.right ? `${tinyButtonBorderRadious}em` : 0};

  ${props =>
    props.script
      ? `font-family: ${
          props.theme.typography.font.serif
        } !important;font-weight: 400 !important;`
      : null};
`
