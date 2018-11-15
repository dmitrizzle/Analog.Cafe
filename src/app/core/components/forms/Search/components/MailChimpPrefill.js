import React from "react"

import { GA } from "../../../../../utils"
import { validateEmail } from "../../../../utils/messages-session"
import Button from "../../../../../core/components/controls/Button/components/Button"
import EmailInput from "../../EmailInput"
import Form from "../../Form"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputClick = this.handleInputClick.bind(this)
    this.state = {
      email: "",
      warning: false
    }
  }
  handleEmailChange = event => {
    this.setState({ email: event.target.value || "", warning: false })
  }
  handleSubmit = event => {
    event.stopPropagation()
    event.preventDefault()
    if (validateEmail(this.state.email)) {
      this.props.submitCallback && this.props.submitCallback(this.state.email)
      window.open(
        (this.props.formUrl ||
          "https://cafe.us4.list-manage.com/subscribe/post?u=256339f7eafa36f2f466aca44&id=f43e54afe2&MERGE0=") +
          this.state.email,
        "_blank",
        "height=450,width=600"
      )
      GA.event({
        category: "Campaign",
        action: "MailChimpForm_send",
        label: this.props.formLocation ? this.props.formLocation : null
      })
    } else this.setState({ warning: true })
  }
  handleInputClick = event => {
    event.stopPropagation()
  }
  render = () => {
    return (
      <Form
        style={this.props.style || null}
        withinGroup={this.props.withinGroup}
      >
        <EmailInput
          onChange={this.handleEmailChange}
          warning={this.state.warning}
          autoFocus={this.props.autoFocus}
          onClick={this.handleInputClick}
        />
        <Button
          inverse
          onClick={event => {
            this.handleSubmit(event)
          }}
        >
          {this.props.buttonText || "Subscribe"}
        </Button>
      </Form>
    )
  }
}
