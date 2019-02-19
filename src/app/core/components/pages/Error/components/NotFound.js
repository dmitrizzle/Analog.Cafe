import React from "react"

import { HEADER_ERRORS, TEXT_ERRORS } from "../../../../../constants"
import Error from ".."
import Link from "../../../controls/Link"

export default class extends React.PureComponent {
  componentWillMount = () => {
    try {
      this.props.history.replace({
        state: {
          status: "404"
        }
      })
    } catch (exception) {
      console.log(
        "Couldn't push to history. You probably used two slashes instead of one in URL."
      )
    }
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
        errorDetails={TEXT_ERRORS.CODE_404.error}
      >
        Click{" "}
        <strong>
          <Link to="/">here</Link>
        </strong>{" "}
        to go to homepage.
      </Error>
    )
  }
}
