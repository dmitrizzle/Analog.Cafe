import React from "react"
import styled from "styled-components"

import { APP_NAME } from "../../../../../constants"
import Logo from "../../../icons/Logo"

const NavLogo = styled.div`
  position: ${props => (props.stamp ? "relative" : "absolute")};
  top: -${props => props.theme.size.block.padding / 2 + 1}em;
  left: calc(
    50% -
      ${props =>
        props.theme.size.font.make.larger -
        props.theme.size.block.spacing / 2}em
  );
  z-index: ${props => props.theme.layer.up};
  padding: ${props => props.theme.size.block.spacing}em;
  width: 5em;
`
const LogoWithDownstate = styled(Logo)`
  background: ${props =>
    props.stamp
      ? props.theme.color.brand()
      : props => props.theme.color.foreground()};
  box-shadow: 0 1px 1px
    ${props => props.theme.color.foreground(props.theme.opacity.least * 2)};

  a.active &,
  a:active & {
    background: ${props => props.theme.color.brand()};
  }
  a:active & {
    box-shadow: 0 0 ${props => props.theme.color.foreground()} inset;
  }
`
export default props => {
  return (
    <NavLogo {...props} title={APP_NAME}>
      <LogoWithDownstate {...props} />
    </NavLogo>
  )
}
