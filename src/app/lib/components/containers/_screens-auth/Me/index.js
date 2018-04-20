// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { forget as forgetUser } from "../../../../store/actions/userActions"

// components
import List from "../../List"
import Forbidden from "../../_screens-errors/Forbidden"

// render
const Me = props => {
  return props.user.status === "ok" ? (
    <List
      private
      isAdmin={props.user.info.role === "admin"}
      placeholder="HowToSubmit"
    />
  ) : (
    <Forbidden />
  )
}

// connect with redux
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
