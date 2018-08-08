import { connect } from "react-redux"
import React from "react"
import styled, { css } from "styled-components"

import { TEXT_EMOJIS } from "../../../../constants"
import { fetchModal, setModal } from "../../../store/actions-modal"
import Button from "../Button/components/Button"

const inlineStar = css`
content: "${TEXT_EMOJIS.STAR}";
text-decoration: none;
font-style: normal;
display: inline-block;
vertical-align: super;
font-size: 0.5em;
margin-right: -.25em;
margin-left: -.15em;
margin-top: -.5em;
`

const ModalLauncher = props => {
  const invokeModal = event => {
    event.stopPropagation()
    event.preventDefault()
    props.with.request
      ? props.fetchModal(props.with.request)
      : props.setModal(
          {
            status: "ok",
            info: props.with.info
          },
          { url: props.with.id }
        )
  }
  let wrapperElement, wrapperProps
  if (!props.wrapperElement) {
    wrapperElement = "a"
    wrapperProps = {
      href: "#card"
    }
  } else {
    wrapperElement = props.wrapperElement
    wrapperProps = {}
  }
  const WrapperComponent = wrapperElement
  let ModalLauncherComponent
  switch (wrapperElement) {
    case "a":
      ModalLauncherComponent = styled(WrapperComponent)`
        &::after {
          ${inlineStar};
        }
      `
      break
    case "Button":
      ModalLauncherComponent = props => (
        <Button {...props} onClick={invokeModal.bind(this)}>
          {props.children}
        </Button>
      )
      break
    default:
      ModalLauncherComponent = WrapperComponent
  }

  return (
    <ModalLauncherComponent
      style={props.style}
      onClick={invokeModal.bind(this)}
      {...wrapperProps}
      itemProp={props.itemPropAuthor ? "author" : null}
      itemScope={props.itemPropAuthor}
      itemType={props.itemPropAuthor ? "https://schema.org/Person" : null}
    >
      {props.children}
    </ModalLauncherComponent>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    },
    fetchModal: request => {
      dispatch(fetchModal(request))
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(ModalLauncher)
