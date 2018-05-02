import React from "react"
import styled from "styled-components"

import { makeFroth } from "../../../../../utils"

const Avatar = styled.span`
  width: 1em;
  height: 1em;
  border-radius: 1em;
  margin: 0 0 -0.075em;
  overflow: hidden;
  display: inline-block;

  background: ${props =>
    props.theme.color.foreground(props.theme.opacity.least)};
  box-shadow: 0 0 0 1px
    ${props => props.theme.color.foreground(props.theme.opacity.half / 2)} inset;

  & > img {
    width: 100%;
    display: block;
  }
`

export default props => {
  return (
    <Avatar>
      <img
        src={makeFroth({ src: props.image, size: "i" }).src}
        alt="Profile avatar"
      />
    </Avatar>
  )
}
