import React from "react"

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
    validateEmail(this.state.email)
      ? window.open(
          (this.props.formUrl ||
            "https://cafe.us4.list-manage.com/subscribe/post?u=256339f7eafa36f2f466aca44&id=f43e54afe2&MERGE0=") +
            this.state.email,
          "_blank",
          "height=450,width=600"
        )
      : this.setState({ warning: true })
    this.props.submitCallback && this.props.submitCallback(this.state.email)
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
          branded
          onClick={event => {
            this.handleSubmit(event)
            import("react-ga").then(ReactGA => {
              ReactGA.event({
                category: "Campaign",
                action: "MailChimpForm_send",
                label: this.props.formLocation ? this.props.formLocation : null
              })
            })
          }}
        >
          {this.props.buttonText || "Subscribe"}
        </Button>
      </Form>
    )
  }
}
