import React from "react"

import { TEXT_LABELS } from "../../../../core/constants/messages-"
import CardButton from "../../../../core/components/controls/Card/components/CardButton"
import MailChimpPrefill from "./components/MailChimpPrefill"

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      subscribeForm: this.props.stateOverwrite
        ? this.props.stateOverwrite.subscribeForm
        : false
    }
  }
  handleRevealSubscribeForm = event => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      subscribeForm: !this.state.subscribeForm
    })
    this.props.subscribeFormCallback &&
      this.props.subscribeFormCallback(this.state.subscribeForm)
    // GA.event({
    //   category: "Campaign",
    //   action: "ActionsCard.quickSubscribe_open",
    //   label: this.props.formLocation ? this.props.formLocation : null
    // })
  }
  handleSubmitCallback = () => {
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
      <React.Fragment>
        {!this.state.subscribeForm ? (
          <CardButton branded onClick={this.handleRevealSubscribeForm}>
            {this.props.formClosedButtonText || TEXT_LABELS.SUBSCRIBE}
          </CardButton>
        ) : (
          <MailChimpPrefill
            formLocation={this.props.formLocation}
            buttonText={
              this.props.formButtonText || TEXT_LABELS.SUBMIT_EMAIL_ADDR
            }
            autoFocus={
              this.props.autoFocus === false ? this.props.autoFocus : true
            }
            submitCallback={this.handleSubmitCallback}
          />
        )}
      </React.Fragment>
    )
  }
}
