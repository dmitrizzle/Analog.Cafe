// tools
import React from "react"

// components
import { Button } from "../../components/Button"
import EmailInput from "./components/EmailInput"

// redux
import { connect } from "react-redux"
import { loginWithEmail } from "../../../actions/userActions"
import { setCard } from "../../../actions/modalActions"

// styles
import { Form } from "../../components/FormStyles"

// helpers
import validateEmail from "../../../utils/email-validator"
import errorMessages from "../../../constants/messages/errors"

// render
class SigninWithEmail extends React.PureComponent {
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
    event.stopPropagation()
    event.preventDefault()
    if (validateEmail(this.state.email)) {
      if (
        !this.props.user.emailLogin.timeout ||
        Date.now() > this.props.user.emailLogin.timeout
      )
        this.props.loginWithEmail(this.state.email)
      else
        this.props.setCard({
          status: "ok",
          info: errorMessages.VIEW_TEMPLATE.EMAIL_LOGIN_TIMEOUT(
            Math.floor((this.props.user.emailLogin.timeout - Date.now()) / 1000)
          ),
          requested: { url: "errors/email-login-wait" }
        })
      return
    }

    this.setState({ warning: true })
  }
  render = () => {
    return (
      <Form>
        <EmailInput
          onChange={this.handleEmailChange}
          warning={this.state.warning}
        />

        <Button
          onClick={this.handleSubmit}
          loading={this.props.user.emailLogin.status === "pending"}
        >
          Continue
        </Button>
      </Form>
    )
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    loginWithEmail: validatedEmail => {
      dispatch(loginWithEmail(validatedEmail))
    },
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninWithEmail)
