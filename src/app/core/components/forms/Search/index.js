import React from "react"

import { GA } from "../../../../utils"
import { TEXT_LABELS } from "../../../constants/messages-"
import CardButton from "../../controls/Card/components/CardButton"
import MailChimpPrefill from "../../../../user/components/forms/Subscribe/components/MailChimpPrefill"

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      subscribeForm: false
    }
  }
  handleRevealSubscribeForm = event => {
    this.props.searchMode(true)
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      subscribeForm: !this.state.subscribeForm
    })
    this.props.subscribeFormCallback &&
      this.props.subscribeFormCallback(this.state.subscribeForm)
    GA.event({
      category: "Campaign",
      action: "ActionsCard.quickSubscribe_open",
      label: this.props.formLocation ? this.props.formLocation : null
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
          <CardButton inverse onClick={this.handleRevealSubscribeForm}>
            {TEXT_LABELS.SEARCH}
          </CardButton>
        ) : (
          <MailChimpPrefill
            formLocation={this.props.formLocation}
            buttonText={TEXT_LABELS.FIND}
            autoFocus
            submitCallback={this.handleSubmitCallback}
          />
        )}
      </div>
    )
  }
}
