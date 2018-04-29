import React from "react"

import { withRouter } from "react-router"

import { HEADER_ERRORS, TEXT_ERRORS } from "../../../../../constants"
import ErrorPage from "../../../vignettes/ErrorPage"
import Link from "../../../controls/Link"

class Forbdden extends React.PureComponent {
  componentWillMount = () => {
    this.props.history.replace({
      state: {
        status: "403"
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
        errorTitle={HEADER_ERRORS.ARTICLE.title}
        errorSubtitle={HEADER_ERRORS.ARTICLE.subtitle}
        errorDetails={TEXT_ERRORS.CODE_403.error}
      >
        You need to{" "}
        <strong>
          <Link to="/sign-in">sign in</Link>
        </strong>{" "}
        to view this page.
      </ErrorPage>
    )
  }
}

export default withRouter(Forbdden)
