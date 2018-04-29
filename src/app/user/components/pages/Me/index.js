import { connect } from "react-redux"
import React from "react"

import { forgetUser } from "../../../store/actions-user"
import Forbidden from "../../../../core/components/pages/Forbidden"
import List from "../../../../core/components/pages/List"

const Me = props => {
  return props.user.status === "ok" ? (
    <List
      private
      isAdmin={props.user.info.role === "admin"}
      placeholder="PlaceholderHowToSubmit"
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
