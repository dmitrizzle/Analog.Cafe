import styled from "styled-components"

export default styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${props => props.theme.size.block.spacing / 4}em
    ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.size.block.spacing / 3}em
    ${props => props.theme.size.block.padding / 2}em;
  ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.smaller}em;
  background: ${props => props.theme.color.brand()};
  color: ${props => props.theme.color.background()};
  border-bottom-left-radius: ${props => props.theme.size.block.spacing / 2}em;
`
