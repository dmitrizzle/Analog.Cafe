import React from "react"
import styled, { css } from "styled-components"

import Link from "../../Link"

// NOTE: these CSS properties are rendered in index.html as critical path CSS
// <StyledLink />
// background: ${props => props.theme.color.background()};
// text-decoration: none;
// position: relative;

export const navActiveCss = css`
  background: ${props => props.theme.color.brand()};
  color: ${props => props.theme.color.background()};
  ::before {
    content: "";
    width: 110%;
    left: -5%;
    height: 2px;
    bottom: -5px;
    background: ${props => props.theme.color.foreground()};
    position: absolute;
  }
`

const StyledLink = styled(Link)`
  &.active {
    ${navActiveCss};
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
export const NavLogoLink = props => {
  return <Link {...props} activeClassName="active" />
}
