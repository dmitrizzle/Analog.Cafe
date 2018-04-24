import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { Button } from "../../Button"
import { fetchCard, setCard } from "../../../../store/actions-modal"
import InlineStarIcon from "../../../icons/InlineStarIcon"

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
          ${InlineStarIcon};
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
