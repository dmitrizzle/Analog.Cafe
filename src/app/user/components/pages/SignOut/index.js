// import React from "react"

// redux
import { connect } from "react-redux"
import { forget as forgetUser } from "../../../store/actions/userActions"

const SignOut = props => {
  props.forgetUser()
  props.history.replace({ pathname: "/" })
  return null
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    forgetUser: () => {
      dispatch(forgetUser())
    }
  }
}
export default connect(null, mapDispatchToProps)(SignOut)
