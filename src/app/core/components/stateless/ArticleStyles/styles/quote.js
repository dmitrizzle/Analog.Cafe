// styles
import { css } from "styled-components"

// css
const base = css`
  font-size: ${props => props.theme.size.font.make.smaller}em;
  font-style: italic;
  position: relative;
  margin: -${props => props.theme.size.block.border}px -${props =>
      props.theme.size.block.padding * 1.16666666666666666}em
    0;
  overflow: hidden;
  clear: both;
  padding: ${props => props.theme.size.block.padding * 2}em
    ${props => props.theme.size.block.padding}em;
  border-top: ${props => props.theme.elements.thickBorder};
  border-bottom: ${props => props.theme.elements.thickBorder};
`
const content = css`
  &:not(.focus) {
    :first-letter {
      font-size: ${props => props.theme.size.font.make.larger * 2}em;
      font-style: normal;
      font-weight: 700;
      float: left;
      margin: 0.3em 0.075em 0.075em 0;
      ::selection {
        background: ${props => props.theme.color.highlight()};
      }
    }
    ${props => props.theme.size.breakpoint.min.l`
				column-count: 2;
				column-gap: ${props => props.theme.size.block.padding * 2}em;
			`};
  }
  &.focus {
    box-shadow: 0 -${props => props.theme.size.block.border}px 0 ${props => props.theme.color.highlight()},
      0 ${props => props.theme.size.block.border}px 0
        ${props => props.theme.color.highlight()};
  }
  p {
    margin: 0;
  }
  ${props => props.theme.size.breakpoint.min.l`
		&:not(.focus) p:first-of-type {
			min-height: ${props => props.theme.size.font.make.larger * 4}em;
		}
	`};
`
const marks = css`
  &::before,
  &::after {
    content: "“";
    display: block;
    position: absolute;
    top: ${props => props.theme.size.block.spacing / 4}em;
    left: 0;
    font-size: ${props => props.theme.size.font.make.larger * 2}em;
    opacity: ${props => props.theme.opacity.least};
    font-weight: 700;
  }
  &::after {
    content: "”";
    top: initial;
    left: initial;
    bottom: -${props => props.theme.size.block.spacing / 5}em;
    right: 0;
  }
  &.focus::before {
    content: "Edit Quote:";
    font-size: ${props => props.theme.size.font.make.larger}em;
  }
`

// return
export const Quote = css`
  ${base} ${content} ${marks};
  ${props => props.theme.size.breakpoint.min.l`
  &:not(.focus) > span {
    ${
      "" /* shim to ensure that first huge letter doesn't get sliced by Chrome */
    }
    display: block;
    min-height: 13em;
  }`};
`
