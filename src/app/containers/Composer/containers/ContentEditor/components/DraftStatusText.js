// tools
import React from "react"
import styled from "styled-components"

const DraftStatusText = styled.p`
  text-align: center;
  ${props => props.theme.typography.title.auto} opacity: 0.5;
`

export default props => {
  return <DraftStatusText>{props.children}</DraftStatusText>
}
