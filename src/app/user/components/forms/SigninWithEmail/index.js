import { connect } from "react-redux"
import React from "react"

import { CARD_ERRORS } from "../../../constants/messages-session"
import { GA } from "../../../../utils"
import { loginWithEmail } from "../../../store/actions-user"
import { setModal } from "../../../../core/store/actions-modal"
import { validateEmail } from "../../../utils/messages-session"
import Button from "../../../../core/components/controls/Button/components/Button"
import EmailInput from "../EmailInput"
import Form from "../Form"

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
    GA.event({
      category: "User",
      action: "Sign In",
      label: "Email"
    })
    if (validateEmail(this.state.email)) {
      if (
        !this.props.user.emailLogin.timeout ||
        Date.now() > this.props.user.emailLogin.timeout
      )
        this.props.loginWithEmail(this.state.email.toLowerCase())
      else
        this.props.setModal({
          status: "ok",
          info: CARD_ERRORS.LOGIN_EMAIL_TIMEOUT(
            Math.floor(
              (this.props.user.emailLogin.timeout - Date.now()) / 1000 + 1
            )
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
          autoFocus
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
const mapDispatchToProps = dispatch => {
  return {
    loginWithEmail: validatedEmail => {
      dispatch(loginWithEmail(validatedEmail))
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninWithEmail)
