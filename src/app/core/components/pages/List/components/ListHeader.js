import styled from "styled-components"

export default styled.div`
  text-align: center;
  font-size: ${props => props.theme.size.font.make.smaller}em;
  height: ${props => props.theme.typography.text.lineHeight}em;
  margin: ${props => props.theme.size.block.spacing * 2}em
    ${props => props.theme.size.block.padding / 3}em
    ${props => props.theme.size.block.padding}em;
  q {
  }
  > span {
    background: ${props => props.theme.color.background()};
    border-radius: ${props => props.theme.effects.borderRadius.small}em;
    box-shadow: 0 0 0 5px ${props => props.theme.color.background()};
  }
`
