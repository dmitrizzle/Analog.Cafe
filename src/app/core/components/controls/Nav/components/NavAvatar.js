import React from "react"
import styled from "styled-components"

import { makeFroth } from "../../../../../utils"

const Avatar = styled.span`
  margin-left: 0.25em;

  width: 0.75em;
  height: 0.75em;
  border-radius: 1em;
  overflow: hidden;
  display: inline-block;
  background: ${props => props.theme.color.brand()};
  box-shadow: 0 0 0 2px #fff;

  & > img {
    width: 100%;
    display: block;
  }
`

export default props => {
  return (
    <Avatar style={props.style}>
      <img
        src={makeFroth({ src: props.image, size: "i" }).src}
        alt="Profile avatar"
      />
    </Avatar>
  )
}
