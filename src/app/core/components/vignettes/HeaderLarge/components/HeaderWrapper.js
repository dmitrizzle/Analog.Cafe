import styled from "styled-components"

const blockSafety = props => props.theme.size.block.padding

export default styled.header`
  ${props => props.theme.size.font.auto} text-align: center;
  margin: ${blockSafety}em auto 0;
  max-width: ${props => props.theme.size.block.column.m}px;
  border-bottom: ${props => props.theme.elements.thickBorder};
  padding: 0 ${blockSafety}em ${blockSafety}em;
`
