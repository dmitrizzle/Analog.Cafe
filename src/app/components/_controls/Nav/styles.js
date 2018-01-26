// tools
import React from "react"
import styled from "styled-components"

// components
import Link from "../Link"

// NOTE: *most* CSS has bee copied into /public/index.html
// for faster critical path loading times.
// some actionable CSS remains here.

// css

// const containerVerticalSpacing = props => props.theme.size.font.make.larger / 1.2

export const NavWrapper = styled.nav`
  ${"" /* ${props => props.theme.size.font.auto} ${props =>
      props.theme.typography.title.auto} position: relative;
  z-index: ${props => props.theme.layer.nav};
  margin-top: ${containerVerticalSpacing}em;
  margin-bottom: ${containerVerticalSpacing}em;

  > ul {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  } */};
`
const StyledLink = styled(Link)`
  ${"" /* background: 			${props => props.theme.color.background};
	text-decoration: 	none;
	position: 				relative; */};
  &.active::before {
    content: "";
    width: 110%;
    left: -5%;
    height: 2px;
    bottom: -5px;
    background: ${props => props.theme.color.foreground};
    position: absolute;
  }
  ${props =>
    props.connectionStatus === "offline"
      ? `
    opacity: ${props.theme.opacity.half}
  `
      : null};
`
export const NavLink = props => {
  return <StyledLink {...props} activeClassName="active" />
}
export const NavIndexLink = props => {
  return <Link {...props} activeClassName="active" />
}

export const NavItem = styled.li`
  ${"" /* display: block;
  text-align: center;
  width: 7em; */} ${"" /* ${props =>
    props.center
      ? props => props.theme.size.breakpoint.max.m`order: 1;`
      : false} ${props =>
      props.left
        ? props => props.theme.size.breakpoint.max.m`order: 0;`
        : false} ${props =>
      props.right
        ? props => props.theme.size.breakpoint.max.m`order: 2;`
        : false} ${props =>
      props.prime
        ? false
        : props => props.theme.size.breakpoint.max.m`display:none;`} ${props =>
      props.indicator
        ? `color: ` +
          props.theme.color.alpha.foreground(props.theme.opacity.half)
        : null}; */};

  ${props =>
    props.draftStatus &&
    `
    // for "Draft Saved" button we need to set some trims because on very small
    // screens it breaks design
    overflow: hidden;
    height: ${props.theme.size.block.spacing /
      props.theme.size.font.make.smaller}em;
  `};
`

// styles for tiny profile icon
export const TinyImageInline = styled.span`
  width: 1em;
  height: 1em;
  border-radius: 1em;
  margin: 0 0 -0.075em;
  overflow: hidden;
  display: inline-block;

  background: ${props =>
    props.theme.color.alpha.foreground(props.theme.opacity.least)};
  box-shadow: 0 0 0 1px
    ${props => props.theme.color.alpha.foreground(props.theme.opacity.half / 2)}
    inset;

  & > img {
    width: 100%;
    display: block;
  }
`

// styles for connectivity indicator
export const Connection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${props => props.theme.size.block.spacing / 4}em
    ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.size.block.spacing / 3}em
    ${props => props.theme.size.block.column.safety / 2}em;
  ${props => props.theme.typography.title.auto} font-size: ${props =>
      props.theme.size.font.make.smaller}em;
  background: ${props => props.theme.color.brand};
  color: ${props => props.theme.color.background};
  border-bottom-left-radius: ${props => props.theme.size.block.spacing / 2}em;
`
