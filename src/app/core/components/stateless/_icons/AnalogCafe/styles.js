// styles
import styled from "styled-components"

// css
const logoSize = props => props.theme.size.font.make.larger
const logoPadding = props => props.theme.size.block.spacing / 2

export const LogoContainer = styled.div`
  width: ${logoSize}em;
  height: ${logoSize}em;
  overflow: hidden;
  margin: 0 auto;
  padding: ${logoPadding}em;
  border-radius: ${props => props.theme.effects.borderRadius.med}em;
  transform: rotate(45deg);

  svg {
    transform: rotate(-45deg);
    height: 100%;
    width: 100%;
    path {
      fill: #fff;
    }
  }
`
