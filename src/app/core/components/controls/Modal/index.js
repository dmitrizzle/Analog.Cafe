import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { TEXT_EMOJIS } from "../../../../constants"
import { fetchModal, setModal } from "../../../store/actions-modal"
import Button from "../Button/components/Button"

export const ModalLink = styled.a`
  ${props =>
    !props.unmarked &&
    `
    &::after{
      content: "${TEXT_EMOJIS.CARD}";
      text-decoration: none;
      font-style: normal;
      display: inline-block;
      vertical-align: super;
      font-size: 0.5em;
      margin-right: -.25em;
      margin-left: 0em;
      margin-top: -.5em;
    }
  `};
`

export const launchModal = function(event) {
  event.stopPropagation()
  event.preventDefault()
  this.props.with.request
    ? this.props.fetchModal(this.props.with.request)
    : this.props.setModal(
        {
          status: "ok",
          info: this.props.with.info
        },
        { url: this.props.with.id }
      )
}

const ModalLauncher = props => {
  const { element } = props
  const { setModal, fetchModal, ...rest } = props
  const componentProps = { ...rest, onClick: launchModal.bind({ props }) }

  if (element && element !== "Button" && element !== "a")
    return <element {...componentProps}>{props.children}</element>

  if (element === "Button")
    return <Button {...componentProps}>{props.children}</Button>

  return (
    <ModalLink {...componentProps} href="#card">
      {props.children}
    </ModalLink>
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
