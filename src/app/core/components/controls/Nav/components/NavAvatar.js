import React from "react"
import styled from "styled-components"

import { makeFroth } from "../../../../../utils"

const Avatar = styled.span`
  position: absolute;
  width: 0.67em;
  height: 0.67em;
  right: 0.96em;
  top: 0.34em;
  border-radius: 1em;
  overflow: hidden;
  display: inline-block;
  background: ${props =>
    props.theme.color.foreground(props.theme.opacity.least)};

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
