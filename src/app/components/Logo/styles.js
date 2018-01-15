// styles
import styled from "styled-components"
import Color from "color"

// components
import Logo from "../_icons/AnalogCafe"

// css
export const LogoOutline = styled.div`
  position: ${props => (props.stamp ? "relative" : "absolute")};
  top: -${props => props.theme.size.block.column.safety / 2 + 1}em;
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
export const LogoWithDownstate = styled(Logo)`
  background: ${props =>
    props.stamp
      ? props.theme.color.brand
      : props => props.theme.color.foreground};
  box-shadow: 0 1px 1px
    ${props =>
      Color(props.theme.color.foreground)
        .alpha(props.theme.opacity.least * 2)
        .string()};

  a.active &,
  a:active & {
    background: ${props => props.theme.color.brand};
  }
  a:active & {
    box-shadow: 0 0 ${props => props.theme.color.foreground} inset;
  }
`
