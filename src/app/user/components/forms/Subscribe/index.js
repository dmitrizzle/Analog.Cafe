import React from "react"

import { TEXT_LABELS } from "../../../../core/constants/messages-"
import CardButton from "../../../../core/components/controls/Card/components/CardButton"
import MailChimpPrefill from "./components/MailChimpPrefill"

export default class extends React.PureComponent {
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
    import("react-ga").then(ReactGA => {
      ReactGA.event({
        category: "Campaign",
        action: "ActionsCard.quickSubscribe",
        label: this.props.formLocation ? this.props.formLocation : null
      })
    })
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
      <div>
        {!this.state.subscribeForm ? (
          <CardButton branded onClick={this.handleRevealSubscribeForm}>
            {TEXT_LABELS.SUBSCRIBE}
          </CardButton>
        ) : (
          <MailChimpPrefill
            buttonText={TEXT_LABELS.SUBMIT}
            autoFocus
            submitCallback={this.handleSubmitCallback}
          />
        )}
      </div>
    )
  }
}
