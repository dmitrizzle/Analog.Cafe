import styled from "styled-components"

export default styled.span`
  color: ${props => {
    if (props.branded) return props.theme.color.foreground()
    return props.theme.color.brand()
  }};
`
