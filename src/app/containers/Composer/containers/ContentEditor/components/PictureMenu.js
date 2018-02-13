// tools
import React from "react"
import styled from "styled-components"

// components
import {
  ButtonStrip,
  Item
} from "../../../../../components/_controls/ButtonStrip"

const PictureMenu = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  margin-top: ${props => props.theme.size.block.spacing}em;
  z-index: ${props => props.theme.layer.up + 2};

  & a:first-child {
    border-right: 1px solid
      ${props => props.theme.color.alpha.background(props.theme.opacity.least)};
  }
`

// return
export default props => {
  return (
    <PictureMenu>
      <ButtonStrip style={{ margin: "0 auto" }}>
        <div>
          <Item
            onMouseDown={event => {
              event.preventDefault()
              props.removePicture()
            }}
            left
            black
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
            black
          >
            Resize
          </Item>
        </div>
      </ButtonStrip>
    </PictureMenu>
  )
}
