import React from "react"

import { HEADER_ERRORS, TEXT_ERRORS } from "../../../../../constants"
import ErrorPage from "../../../vignettes/ErrorPage"
import Link from "../../../controls/Link"

export default class extends React.PureComponent {
  componentWillMount = () => {
    this.props.history.replace({
      state: {
        status: "404"
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
        errorDetails={TEXT_ERRORS.CODE_404.error}
      >
        Click{" "}
        <strong>
          <Link to="/">here</Link>
        </strong>{" "}
        to go to homepage.
      </ErrorPage>
    )
  }
}
