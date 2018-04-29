import { Helmet } from "react-helmet"
import React from "react"

import { withRouter } from "react-router"

import { HEADER_ERRORS, TEXT_ERRORS } from "../../../constants"
import ArticleSection from "./Article/components/ArticleSection"
import ArticleWrapper from "./Article/components/ArticleWrapper"
import HeaderLarge from "../vignettes/HeaderLarge"
import Link from "../controls/Link"

class NotFound extends React.PureComponent {
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
      <ArticleWrapper>
        <Helmet>
          <title>{HEADER_ERRORS.ARTICLE.title}</title>
        </Helmet>
        <HeaderLarge
          pageTitle={HEADER_ERRORS.ARTICLE.title}
          pageSubtitle={HEADER_ERRORS.ARTICLE.subtitle}
          title={TEXT_ERRORS.CODE_403.error}
        />{" "}
        <ArticleSection>
          <p style={{ textAlign: "center" }}>
            You need to{" "}
            <strong>
              <Link to="/sign-in">sign in</Link>
            </strong>{" "}
            to view this page.
          </p>
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}

export default withRouter(NotFound)
