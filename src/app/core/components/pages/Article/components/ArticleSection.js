import styled, { css } from "styled-components"

import { styles } from "./ArticleQuote"

export const sectionTitle = css`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger / 1.5}em;
  padding-top: ${props => props.theme.size.block.spacing}em;
  margin-bottom: ${props => props.theme.size.block.spacing / 4}em;
  clear: both;
`

const sectionParagraph = css`
  margin: ${props => props.theme.size.block.spacing}em 0;
  ${props =>
    props.articleStatus === "loading"
      ? `opacity: ` +
        props.theme.opacity.least +
        `; letter-spacing: -1px !important;`
      : null};
`
const sectionBreak = css`
  text-align: center;
  padding: ${props => props.theme.size.block.padding * 2}em 0
    ${props => props.theme.size.block.spacing * 4}em;
  color: ${props => props.theme.color.foreground(props.theme.opacity.half)};
  border: 0;
  margin: 0;
  clear: both;
  &:before {
    content: "✽ ✽ ✽";
    line-height: 1em;
    display: block;
  }
  &.focus:before {
    background-color: ${props => props.theme.color.highlight()};
  }
`
export default styled.section`
  cursor: text;

  ${props => props.theme.size.font.auto} ${props =>
    props.theme.typography.text.auto} margin: 0 auto;
  max-width: ${props => props.theme.size.block.column.m}px;
  ${props =>
    props.theme.size.breakpoint.min.xxl`max-width: ${props =>
      props.theme.size.block.column.l}px;`};
  padding: 0 ${props => props.theme.size.block.padding}em;

  &::after {
    content: "";
    clear: both;
    display: block;
  }

  p {
    ${sectionParagraph};
  }
  ul {
    margin: 0 ${props => props.theme.size.block.padding}em 0;
    ${props => props.theme.size.breakpoint.max.xs`
			margin:		0 !important;
		`} li {
      line-height: ${props => props.theme.size.block.padding}em;
      padding-bottom: ${props => props.theme.size.block.spacing}em;
    }
  }
  blockquote {
    ${styles};
  }
  h2,
  h3,
  h4 {
    ${sectionTitle};
  }
  hr {
    ${sectionBreak};
  }
`
