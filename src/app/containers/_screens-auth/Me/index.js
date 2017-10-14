// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { forget as forgetUser } from "../../../../actions/userActions"

// components
import List from "../../List"
import Forbidden from "../../_screens-errors/Forbidden"

import { ROUTE_AUTH_USER_LANDING } from "../../../../constants/user"

// render
const Me = props => {
  return props.user.status === "ok" ? <List private /> : <Forbidden />
}

// connet with redux
const mapDispatchToProps = dispatch => {
  return {
    forgetUser: () => {
      dispatch(forgetUser())
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Me)
