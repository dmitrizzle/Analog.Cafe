// tools
import React from "react"
import Helmet from "react-helmet"

// redux
import { connect } from "react-redux"
import { forget as forgetUser } from "../../../../actions/userActions"

// components
import List from "../../List"
import Forbidden from "../../_screens-errors/Forbidden"
import { LinkButton, ButtonGroup } from "../../../components/Button"
import Link from "../../../components/Link"

import { ROUTE_AUTH_USER_LANDING } from "../../../../constants/user"

// render
const Me = props => {
  return props.user.status === "ok" ? (
    <List
      header={
        <ButtonGroup>
          <Helmet>
            <title>My Submissions</title>
          </Helmet>
          <LinkButton
            to={ROUTE_AUTH_USER_LANDING + "/edit"}
            red
            style={{ margin: "0 auto" }}
          >
            Edit Your Profile
          </LinkButton>
          <strong>
            <Link to="/" onClick={props.forgetUser}>
              Sign Out
            </Link>
          </strong>
        </ButtonGroup>
      }
      private
    />
  ) : (
    <Forbidden />
  )
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
