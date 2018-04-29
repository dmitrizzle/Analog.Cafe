import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { fetchModal, setModal } from "../../../store/actions-modal"
import Button from "../Button/components/Button"
import InlineStarIcon from "../../icons/InlineStarIcon"

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
          ${InlineStarIcon};
        }
      `
      break
    case "Button":
      ModalLauncherComponent = () => (
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
export default connect(null, mapDispatchToProps)(ModalLauncher)
