import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../../utils"
import { HOST_API, HOST_RUNTIME } from "../../../../../constants"
import { hideModal } from "../../../../store/actions-modal"
import ModalCard from "./ModalCard"

const Overlay = styled.aside`
  display: ${props => (props.hidden ? "none" : "block")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => props.theme.layer.card};
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-backdrop-filter: blur(5px);
`

export const modalScrollCallback = (target, callback) => {
  if (!target) return
  const scrollPosition = target.scrollTop
  if (!scrollPosition) return
  const scrollLimitUpper = target.scrollHeight - target.clientHeight
  const scrollAvailableUpper = scrollLimitUpper - scrollPosition
  return scrollAvailableUpper === 0 ? callback() : null
}

const ModalOverlay = props => {
  if (!props.modal.hidden && props.modal.status === "ok") {
    GA.modalview(
      props.modal.requested.url.replace(HOST_API, "").replace(HOST_RUNTIME, "")
    )
  }
  document.onkeydown = event => {
    if (
      event.keyCode === 27 &&
      !props.modal.info.stubborn &&
      !props.modal.hidden
    )
      props.hideModal()
  }
  return (
    <Overlay
      id="modal-overlay"
      hidden={props.modal.hidden}
      onClick={() => props.hideModal()}
      onScroll={event => modalScrollCallback(event.target, props.hideModal)}
    >
      <ModalCard
        title={props.modal.info.title}
        image={props.modal.info.image}
        text={props.modal.info.text}
        error={props.modal.info.error && props.modal.info.error}
        stubborn={props.modal.info.stubborn}
        headless={props.modal.info.headless}
        buttons={props.modal.info.buttons}
        subscribeForm={props.modal.info.subscribeForm}
        subscribeFormLocation={props.modal.info.subscribeFormLocation}
      />
    </Overlay>
  )
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  }
}
const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch(hideModal())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalOverlay)
