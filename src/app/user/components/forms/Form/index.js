import styled from "styled-components"

const shadowGrey = props =>
  props.theme.color.foreground(props.theme.opacity.least)

export default styled.form`
  max-width: ${props => props.theme.size.breakpoint.stops.min}px;
  margin: 0 auto !important;
  background: ${shadowGrey};
  overflow: hidden;
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
        props.inCard ? 0 : props.theme.size.block.padding}em !important;
    }
  `};
  ${props =>
    props.withinGroup &&
    `
    border-radius: 0 !important;
    border-bottom: ${
      props.theme.size.block.border
    }px solid ${props.theme.color.foreground()};

  `};
`
