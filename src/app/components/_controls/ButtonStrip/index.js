// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "../Button"

export const ButtonStrip = styled.div`
  & > div {
    display: flex;
    margin: 0;
  }
  width: 10em;
`

export const Item = styled(({ left, right, script, ...props }) => (
  <TinyButton {...props} />
))`
  margin: 0;
  border-radius: 0;
  ${props =>
    props.left
      ? `border-radius: ${props.theme.effects.borderRadius.small}em 0 0 ${
          props.theme.effects.borderRadius.small
        }em`
      : null};

  ${props =>
    props.right
      ? `border-radius: 0 ${props.theme.effects.borderRadius.small}em ${
          props.theme.effects.borderRadius.small
        }em 0`
      : null};

  ${props =>
    props.script
      ? `font-family: ${
          props.theme.typography.font.serif
        } !important;font-weight: 400 !important;`
      : null};

  ${props => props.theme.size.breakpoint.max.s`
    border-radius: 0;
    padding: 1em;
  `};
`
