import React from "react"
import styled from "styled-components"

const FooterMicro = styled.div`
  width: 8em;
  margin: 0 auto;
  padding: ${props => props.theme.size.block.padding}em;
  cursor: pointer;
`

export default props => {
  return (
    <FooterMicro onClick={() => window.scroll(0, 0)}>
      {props.children}
    </FooterMicro>
  )
}
