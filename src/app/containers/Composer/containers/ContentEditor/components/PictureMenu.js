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
    <PictureMenu style={{ display: props.focus ? "block" : "none" }}>
      <ButtonStrip style={{ margin: "0 auto" }}>
        <div>
          <Item
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              props.focus && props.removePicture()
            }}
            left
            black
          >
            Delete
          </Item>
          <Item
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              props.focus && props.featurePicture()
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
