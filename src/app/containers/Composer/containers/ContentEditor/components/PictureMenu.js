// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "../../../../../components/_controls/Button"

const PictureMenu = styled.div`
  font-variant: normal;
  display: flex !important;
  width: calc(8em * 2 + 1em);
  margin: -4.175em auto 0;
  z-index: ${props => props.theme.layer.up};
  position: relative;
  & >  {
    margin: 0 !important;
  }
`

// return
export default props => {
  return (
    <PictureMenu style={{ opacity: props.focus ? "1" : "0" }}>
      <TinyButton
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          props.removePicture()
        }}
        style={{ width: "6em" }}
      >
        Delete
      </TinyButton>
      <TinyButton
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          props.featurePicture()
        }}
        title="⌘ + F"
      >
        Change Size
      </TinyButton>
    </PictureMenu>
  )
}
