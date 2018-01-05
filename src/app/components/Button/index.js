// tools
import React from "react"
import Loadable from "react-loadable"

// styles
import styled, { css } from "styled-components"
import Color from "color"

// components
import Link from "../Link"

const Loader = Loadable({
  loader: () => import("../_icons/components/Loader"),
  loading: () => null,
  delay: 100
})

// NOTE: Button is much heavier than ButtonLink
// since it includes a loader SVG animation.

// css
export const ButtonStyles = css`
  max-width: ${props => props.theme.size.breakpoint.stops.min}px;

  ${props => props.theme.size.font.auto} ${props =>
      props.theme.typography.title.auto} margin: 0 auto;
  text-decoration: none;
  text-align: center;
  display: block;

  background: ${props => props.theme.color.background};
  background: ${props => (props.black ? props.theme.color.foreground : null)}
    ${props => (props.red ? props.theme.color.brand : null)};
  color: ${props => props.theme.color.foreground} !important;
  color: ${props => (props.black ? props.theme.color.background : null)}
    ${props => (props.red ? props.theme.color.background : null)} !important;

  ${"" /* for non-coloured buttons the animation SVG should have a foreground-colored fill */} & svg > path {
    stroke: ${props =>
      !props.black && !props.red ? props.theme.color.foreground : null};
  }

  border-radius: ${props => props.theme.effects.borderRadius.small}em;
  padding: ${props => props.theme.size.block.spacing / 1.25}em 0;
  margin-top: ${props => props.theme.size.block.spacing}em;
  margin-bottom: ${props => props.theme.size.block.spacing}em;
  cursor: pointer;
  user-select: none;

  box-shadow: 0 1px 1px
      ${props =>
        Color(props.theme.color.foreground)
          .alpha(props.theme.opacity.least * 2)
          .string()},
    0 0 0 1px
      ${props =>
        Color(props.theme.color.foreground)
          .alpha(props.theme.opacity.least)
          .string()};

  &:active {
    background: ${props => props.theme.color.foreground} !important;
    box-shadow: 0 0 ${props => props.theme.color.foreground} inset;
    color: ${props => props.theme.color.background} !important;
  }

  ${props => props.theme.size.breakpoint.max.xs`
    width: 100vw;
    max-width: 100vw;
    border-radius: 0;
    section & {
      margin-left: -${props => props.theme.size.block.column.safety}em;
    }
  `};
`

// below line filter out prop "red" that isn't recognized by Link component
export const LinkButton = styled(
  ({ red, black, responsiveMobileOnly, ...props }) => <Link {...props} />
)`
  ${ButtonStyles};
`
// export non-a/link version of the button
export const Button = styled(
  ({ red, black, responsiveMobileOnly, ...props }) => (
    <button
      className={props.className}
      style={props.style}
      onClick={props.onClick}
      disabled={props.loading}
    >
      <Loader style={props.loading ? null : { width: "0" }} />
      {props.children}
    </button>
  )
)`
  box-sizing: content-box;
  background: inherit;
  border-width: 0;
  color: inherit;
  user-select: none;
  margin: inherit;
  width: 100%;
  outline: transparent;

  &:-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  ${ButtonStyles};
`
export const ButtonGroup = styled.div`
  text-align: center;
  padding: ${props => props.theme.size.block.column.safety}em 0
    ${props => props.theme.size.block.spacing * 4}em;
`

export const TinyButtonStyles = styled(
  ({ responsiveMobileOnly, followComposerCursor, ...props }) => (
    <LinkButton {...props} />
  )
)`
  padding: ${props => props.theme.size.block.spacing / 5}em
    ${props => props.theme.size.block.spacing / 2}em;
  width: 8em;
  border-radius: ${props => props.theme.effects.borderRadius.small}em;

  ${props =>
    props.followComposerCursor &&
    `
  margin-top: 2px;
  position: absolute;
  z-index: ${props.theme.layer.up - 1};
  right: -${props.theme.size.block.column.safety}em;
  ${props.theme.size.breakpoint.max.m`
		right: 0;
	`} ${props.theme.size.breakpoint.max.s`
		right: -${props.theme.size.block.spacing}em;
	`};
  `};
`
export const TinyButton = props => {
  return <TinyButtonStyles {...props}>{props.children}</TinyButtonStyles>
}
