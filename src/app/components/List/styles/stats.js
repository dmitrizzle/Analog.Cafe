// styles
import styled from "styled-components"

// css
export const Stats = styled.span`
  ${props => props.theme.typography.title.auto} margin: 0;
  display: block;
  color: ${props => props.theme.color.brand()};

  /* placeholder style */
  ${props => props.status === "loading" && `letter-spacing: 0 !important;`};
`
