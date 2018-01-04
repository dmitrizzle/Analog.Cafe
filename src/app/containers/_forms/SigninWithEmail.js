// tools
import React from "react"

// components
import { Button } from "../../components/Button"
import EmailInput from "./components/EmailInput"

// redux
import { connect } from "react-redux"
import { loginWithEmail } from "../../../actions/userActions"

// styles
import { Form } from "../../components/FormStyles"

// helpers
import validateEmail from "../../../utils/email-validator"

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
      this.props.loginWithEmail(this.state.email)
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

        <Button onClick={this.handleSubmit}>Continue</Button>
      </Form>
    )
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    loginWithEmail: validatedEmail => {
      dispatch(loginWithEmail(validatedEmail))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninWithEmail)
