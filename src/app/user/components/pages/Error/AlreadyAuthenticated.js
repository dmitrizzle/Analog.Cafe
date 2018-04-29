import React from "react"

import { withRouter } from "react-router"

import { CARD_ERRORS } from "../../../../core/constants/messages-"
import { ROUTE_URL_USER_LANDING } from "../../../constants/routes-session"
import { TEXT_ERRORS } from "../../../../constants"
import ErrorPage from "../../../../core/components/vignettes/ErrorPage"
import Link from "../../../../core/components/controls/Link"

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
      <ErrorPage
        errorTitle={CARD_ERRORS.ARTICLE.title}
        errorSubtitle={CARD_ERRORS.ARTICLE.subtitle}
        errorDetails={TEXT_ERRORS.CODE_103.error}
      >
        You are aloready signed in. Click{" "}
        <strong>
          <Link to={ROUTE_URL_USER_LANDING}>here</Link>
        </strong>{" "}
        to see your stuff.
      </ErrorPage>
    )
  }
}

export default withRouter(AlreadyAuthenticated)
