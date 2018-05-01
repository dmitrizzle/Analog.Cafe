import React from "react"

import { withRouter } from "react-router"

import { HEADER_ERRORS, TEXT_ERRORS } from "../../../../../constants"
import { ROUTE_URL_USER_LANDING } from "../../../../constants/routes-session"
import Error from "../../../../../core/components/pages/Error"
import Link from "../../../../../core/components/controls/Link"

class AlreadyAuthenticated extends React.PureComponent {
  componentWillMount = () => {
    this.props.history.replace({
      state: {
        status: "103" // already authenticated
      }
    })
  }
  componentWillUnmount = () => {
    this.props.history.replace({
      state: {
        status: "200"
      }
    })
  }
  render = () => {
    return (
      <Error
        errorTitle={HEADER_ERRORS.ARTICLE.title}
        errorSubtitle={HEADER_ERRORS.ARTICLE.subtitle}
        errorDetails={TEXT_ERRORS.CODE_103.error}
      >
        You are aloready signed in. Click{" "}
        <strong>
          <Link to={ROUTE_URL_USER_LANDING}>here</Link>
        </strong>{" "}
        to see your stuff.
      </Error>
    )
  }
}
export default withRouter(AlreadyAuthenticated)
