// tools
import React from "react"
import styled from "styled-components"

const DraftStatusText = styled.p`
  text-align: center;
  ${props => props.theme.typography.text.auto};
  font-size: ${props => props.theme.size.font.make.normal}em;
  opacity: ${props => props.theme.opacity.half};
  margin-top: 0;
`

export default props => {
  return (
    <DraftStatusText>
      <em>{props.children}</em>
    </DraftStatusText>
  )
}
