// tools
import React from "react"
import styled from "styled-components"
import { withRouter } from "react-router"
// redux
import { connect } from "react-redux"
import { fetchCard, setCard } from "../../../../actions/modalActions"

// return
class ModalDispatch extends React.Component {
  invokeModal = event => {
    event.preventDefault()
    if(this.props.with.request){
      this.props.with.request.history = this.props.history
      this.props.fetchCard(this.props.with.request)
    }else{
      this.props.setCard(
        {
          status: "ok",
          info: this.props.with.info
        },
        { url: this.props.with.id }
      )
    }
  }
  render() {
    // Wrapper defaults to <a> link, however it could become *any* react component:
    let wrapperElement, wrapperProps
    if(!this.props.wrapperElement){
      wrapperElement = "a"
      wrapperProps = {
        href: "#card",
      }
    }
    else {
      wrapperElement = this.props.wrapperElement
      wrapperProps = {}
    }
    const Wrapper = wrapperElement
    let ModalDispatchWrapper

    wrapperElement === "a"
    ? ModalDispatchWrapper = styled(Wrapper)`
        &::after {
          content: "✦";
          text-decoration: none;
          font-style: normal;
          display: inline-block;
          vertical-align: super;
          font-size: .5em;
          margin-right: -.25em;
          margin-left: -.15em;
          margin-top: -.5em;
        }
      `
    : ModalDispatchWrapper = Wrapper

		return(
      <ModalDispatchWrapper
        style={ this.props.style }
        onClick={ this.invokeModal.bind(this) }
        { ...wrapperProps }>
        { this.props.children }
      </ModalDispatchWrapper>
		)
	}
}

// connet with redux
const mapStateToProps = state => {
	return {
    modal: state.modal,
	}
}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ModalDispatch))
