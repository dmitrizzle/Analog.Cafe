// tools
import React from "react"
import styled from "styled-components"

// components
import { LinkButton } from "../../../../../components/Button"
import { ModalDispatch } from "../../../../../containers/Modal"

// styles
const ImageButton = styled(LinkButton)`
  position: absolute;
  z-index: ${ props => props.theme.layer.up - 1 };
  padding: ${ props => props.theme.size.block.spacing / 5 }em ${ props => props.theme.size.block.spacing / 2 }em;
  margin-top: 2px;
  width: 8em;
  border-radius: ${ props => props.theme.effects.borderRadius.small }em;

  right: -${ props => props.theme.size.block.column.safety }em;
  ${ props => props.theme.size.breakpoint.max.m`
		right: 0;
	`}
  ${ props => props.theme.size.breakpoint.max.s`
		right: -${ props => props.theme.size.block.spacing }em;
	`}
`

// return
export default props => {

  var modalDispatch = null
	if(localStorage.getItem('token')){
    return (
      <ImageButton
        style={{
          top: props.cursorContext ? (props.cursorContext.parentBlockOffsets.top) : 0,
          display: (props.cursorContext.newLine) ? "block" : "none"
        }}
        onClick={ props.onClick }
      >↫ Add Image</ImageButton>
  	)
	}else{
		return (
      <ImageButton
        style={{
          top: props.cursorContext ? (props.cursorContext.parentBlockOffsets.top) : 0,
          display: (props.cursorContext.newLine) ? "block" : "none"
        }}
      >
        <ModalDispatch
        wrapperElement="div"
        with={{
          info: {
            title: "User are not sign in.",
            text: "Please sign in to upload your image.",
            buttons: [
              { to: '/sign-in', text: 'Yes', red: true },
              { to: '#', text: 'No' }
            ]
          },
          id: "footnotes/analog-cafe-inclusive"
        }} >↫ Add Image</ModalDispatch>
      </ImageButton>
		)
	}
}
