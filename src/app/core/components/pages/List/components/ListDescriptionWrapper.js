import styled from "styled-components"

export default styled.div`
  ${props => props.theme.typography.text.auto} ${props =>
    props.theme.size.font.auto} height: 7.5em;
  overflow: hidden;
  margin: -0.5em auto 0;

  max-width: ${props => props.theme.size.block.column.m}px;
  position: relative;
  z-index: ${props => props.theme.layer.card};
`
