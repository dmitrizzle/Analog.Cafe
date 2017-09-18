// styles
import styled from "styled-components"

// css
export const ListDescription = styled.div`
  ${props => props.theme.typography.text.auto} ${props =>
      props.theme.size.font.auto} height: 7.5em;
  overflow: hidden;
  margin: -.5em auto 0;

  max-width: ${props => props.theme.size.block.column.maxwidth.m}px;
  position: relative;
  z-index: ${props => props.theme.layer.card};
`
export const BrandName = styled.strong`
  ${props => props.theme.typography.title.auto} text-align: center;
  display: block;
  font-size: ${props => props.theme.size.font.make.smaller}em;
  margin-bottom: 0.5em;
`
export const ListHeader = styled.div`
  text-align: center;
  font-size: ${props => props.theme.size.font.make.smaller}em;
  height: ${props => props.theme.typography.text.lineHeight}em;
  margin: ${props => props.theme.size.block.spacing * 2}em
    ${props => props.theme.size.block.column.safety / 3}em
    ${props => props.theme.size.block.column.safety}em;
  overflow: hidden;
  q {
    background: ${props => props.theme.color.background};
  }
`
