// tools
import styled from "styled-components"

// return
const shadowGrey = props =>
  props.theme.color.alpha.foreground(props.theme.opacity.least)
const shadowGrey2 = props =>
  props.theme.color.alpha.foreground(props.theme.opacity.least * 2)

export const Form = styled.form`
  max-width: ${props => props.theme.size.breakpoint.stops.min}px;
  margin: 0 auto !important;
  border-radius: ${props =>
    props.theme.effects.borderRadius.small}em !important;
  background: ${shadowGrey};
  overflow: hidden;
  box-shadow: 0 1px 1px ${shadowGrey2}, 0 0 0 1px ${shadowGrey};
  input {
    text-align: center;
    padding: 0;
    line-height: ${props => props.theme.size.block.spacing * 2}em;
  }
  button {
    margin: 0;
    border-radius: 0;
  }

  ${props => props.theme.size.breakpoint.max.xs`
    width: 100vw;
    max-width: 100vw;
    border-radius: 0 !important;
    section & {
      margin-left: -${props =>
        props.theme.size.block.column.safety}em !important;
    }
  `};

  ${props =>
    props.withinGroup &&
    `
    border-radius: 0 !important;
    border-bottom: ${props.theme.size.block.border}px solid ${
      props.theme.color.foreground
    };

  `};
`
