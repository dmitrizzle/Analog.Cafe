// tools
import React from "react"
import styled from "styled-components"

// redux
import { connect } from "react-redux"
import { fetchCard, setCard } from "../../../../actions/modalActions"

import { Button } from "../../../components/Button"
import emojis from "../../../../constants/messages/emojis"

// return
const ModalDispatch = props => {
  const invokeModal = event => {
    event.stopPropagation()
    event.preventDefault()
    props.with.request
      ? props.fetchCard(props.with.request)
      : props.setCard(
          {
            status: "ok",
            info: props.with.info
          },
          { url: props.with.id }
        )
  }
  // Wrapper defaults to <a> link, however it could become *any* react component:
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
  const Wrapper = wrapperElement
  let ModalDispatchWrapper

  switch (wrapperElement) {
    case "a":
      ModalDispatchWrapper = styled(Wrapper)`
        &::after {
          content: "${emojis.STAR}";
          text-decoration: none;
          font-style: normal;
          display: inline-block;
          vertical-align: super;
          font-size: 0.5em;
          margin-right: -.25em;
          margin-left: -.15em;
          margin-top: -.5em;
        }
      `
      break
    case "Button":
      ModalDispatchWrapper = () => (
        <Button {...props} onClick={invokeModal.bind(this)}>
          {props.children}
        </Button>
      )
      break
    default:
      ModalDispatchWrapper = Wrapper
  }

  return (
    <ModalDispatchWrapper
      style={props.style}
      onClick={invokeModal.bind(this)}
      {...wrapperProps}
    >
      {props.children}
    </ModalDispatchWrapper>
  )
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    fetchCard: request => {
      dispatch(fetchCard(request))
    }
  }
}
export default connect(null, mapDispatchToProps)(ModalDispatch)
