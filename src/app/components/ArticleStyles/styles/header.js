// styles
import styled from "styled-components"

// css
const blockSafety = props => props.theme.size.block.column.safety

// return
export const Header = styled.header`
  ${props => props.theme.size.font.auto} text-align: center;
  margin: ${blockSafety}em auto 0;
  max-width: ${props => props.theme.size.block.column.maxwidth.m}px;
  border-bottom: ${props => props.theme.elements.thickBorder};
  padding: 0 ${blockSafety}em ${blockSafety}em;
`
export const Title = styled.h1`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
      props.theme.size.font.make.larger}em;
  hyphens: auto;
`
export const Subtitle = styled.h2`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
      props.theme.size.font.make.larger / 2}em;
`
export const Byline = styled.div`
  ${props => props.theme.typography.text.auto} font-size: ${props =>
      props.theme.size.font.make.smaller}em;
  font-style: italic;
  display: block;
  display: inline;
  ${"" /* & a {
		font-variant: normal;
		font-style: italic;
	} */};
`
