import React from "react"
import styled from "styled-components"

import {
  ButtonStrip,
  Item
} from "../../../../../../../core/components/controls/ButtonStrip"

// components

const PictureMenu = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  margin-top: ${props => props.theme.size.block.spacing}em;
  z-index: ${props => props.theme.layer.up + 2};

  & a:first-child {
    border-right: 1px solid
      ${props => props.theme.color.background(props.theme.opacity.least)};
  }
`

// return
export default props => {
  return (
    <PictureMenu style={{ pointerEvents: "none" }}>
      <ButtonStrip style={{ margin: "0 auto", pointerEvents: "auto" }}>
        <div>
          <Item
            onMouseDown={event => {
              event.preventDefault()
              props.removePicture()
            }}
            left
            inverse
          >
            Delete
          </Item>
          <Item
            onMouseDown={event => {
              event.preventDefault()
              props.featurePicture()
            }}
            title="⌘ + F"
            right
            inverse
          >
            Resize
          </Item>
        </div>
      </ButtonStrip>
    </PictureMenu>
  )
}
