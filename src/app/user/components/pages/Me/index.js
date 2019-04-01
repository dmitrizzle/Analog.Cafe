import { connect } from "react-redux"
import React from "react"

import Forbidden from "../../../../core/components/pages/Error/components/Forbidden"
import List from "../../../../core/components/pages/List"

const Me = props => {
  return props.user.status === "ok" ? (
    <List private isAdmin={props.user.info.role === "admin"} me />
  ) : (
    <Forbidden />
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  null
)(Me)
