// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { hideCard } from "../../../../actions/modalActions"

// components
import { CardModal, ModalOverlay } from "../../../components/Card"

import {
  ROUTE_APP_CURRENT_DOMAIN,
  ROUTE_API_DOMAIN
} from "../../../../constants/app"

// return
const Modal = props => {
  if (!props.modal.hidden && props.modal.status === "ok") {
    // async load Google Analytics module
    import("react-ga").then(ReactGA => {
      ReactGA.modalview(
        props.modal.requested.url
          .replace(ROUTE_API_DOMAIN, "") // cut api domain from the middle of reported path
          .replace(ROUTE_APP_CURRENT_DOMAIN, "") // cut app domain from the middle of reported path
      ) // google analytics
    })
  }

  // close card on escape keypress
  document.onkeydown = event => {
    if (
      event.keyCode === 27 &&
      !props.modal.info.stubborn &&
      !props.modal.hidden
    )
      props.hideCard()
  }

  return (
    <ModalOverlay
      id="modal-overlay"
      style={{
        display: props.modal.hidden ? "none" : "block"
      }}
      // there should be a way to close the card by a click of any button but not with clicking outside of the card
      onClick={() => props.hideCard()}
    >
      <CardModal
        title={props.modal.info.title}
        image={props.modal.info.image}
        text={props.modal.info.text}
        error={props.modal.info.error && props.modal.info.error}
        stubborn={props.modal.info.stubborn}
        buttons={props.modal.info.buttons}
      />
    </ModalOverlay>
  )
}

// connect with redux
const mapStateToProps = state => {
  return {
    modal: state.modal
  }
}
const mapDispatchToProps = dispatch => {
  return {
    hideCard: () => {
      dispatch(hideCard())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
