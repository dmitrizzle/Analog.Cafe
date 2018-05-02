import styled, { css } from "styled-components"

import LinkButton from "../../Button/components/LinkButton"

export const styles = css`
  max-width: 100%;
  margin: 0;
  border-radius: 0;
  &:active {
    box-shadow: 0 -1px 0 ${props => props.theme.color.foreground()};
  }
  ${props =>
    props.responsiveMobileOnly &&
    props.theme.size.breakpoint.min.l`display:none;`};
`

export default styled(LinkButton)`
  ${styles};
`
