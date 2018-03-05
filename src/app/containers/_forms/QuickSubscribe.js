// tools
import React from "react"

import MailChimpPrefill from "./MailChimpPrefill"
import { CardButton } from "../../components/Card/styles"

import {
  KEYWORD_SUBSCRIBE,
  KEYWORD_SUBSCRIBE_SUBMIT
} from "../../../constants/messages/keywords"

export class QuickSubscribe extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      subscribeForm: false
    }
    this.handleRevealSubscribeForm = this.handleRevealSubscribeForm.bind(this)
  }
  handleRevealSubscribeForm = event => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      subscribeForm: !this.state.subscribeForm
    })
    this.props.subscribeFormCallback &&
      this.props.subscribeFormCallback(this.state.subscribeForm)

    // async load Google Analytics module
    import("react-ga").then(ReactGA => {
      ReactGA.event({
        category: "Campaign",
        action: "ActionsCard.quickSubscribe"
      })
    })
  }
  handleSubmitCallback = email => {
    this.setState({
      subscribeForm: !this.state.subscribeForm
    })
  }
  componentWillReceiveProps = nextProps => {
    if (
      nextProps.stateOverwrite === null ||
      nextProps.stateOverwrite === undefined
    )
      return
    this.setState({
      subscribeForm: nextProps.stateOverwrite
    })
  }
  render = () => {
    return (
      <div>
        {!this.state.subscribeForm ? (
          <CardButton red onClick={this.handleRevealSubscribeForm}>
            {KEYWORD_SUBSCRIBE}
          </CardButton>
        ) : (
          <MailChimpPrefill
            buttonText={KEYWORD_SUBSCRIBE_SUBMIT}
            autoFocus
            submitCallback={this.handleSubmitCallback}
          />
        )}
      </div>
    )
  }
}
