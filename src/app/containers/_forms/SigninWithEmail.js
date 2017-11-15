// tools
import React from "react"

// components
import { ModalDispatch } from "../Modal"
import { Button } from "../../components/Button"
import EmailInput from "./components/EmailInput"

// styles
import { Form } from "../../components/FormStyles"

// helpers
import validateEmail from "../../../utils/email-validator"

import { MESSAGE_HINT_CHECK_EMAIL } from "../../../constants/messages/hints"

// render
export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { email: "", warning: false }
  }
  handleEmailChange = event => {
    this.setState({ email: event.target.value || "", warning: false })
  }
  handleSubmit = event => {
    if (validateEmail(this.state.email)) return
    event.stopPropagation()
    event.preventDefault()
    this.setState({ warning: true })
  }
  render = () => {
    return (
      <Form>
        <EmailInput
          onChange={this.handleEmailChange}
          warning={this.state.warning}
        />

        <ModalDispatch
          with={MESSAGE_HINT_CHECK_EMAIL(this.state.email)}
          wrapperElement="div"
        >
          <Button onClick={this.handleSubmit}>Continue</Button>
        </ModalDispatch>
      </Form>
    )
  }
}
