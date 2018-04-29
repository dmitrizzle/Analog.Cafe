import React from "react"

import { withRouter } from "react-router"

import { CARD_ERRORS } from "../../../../core/constants/messages-"
import { ROUTE_URL_USER_LANDING } from "../../../constants/routes-session"
import { TEXT_ERRORS } from "../../../../constants"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Helmet from "../../../../core/components/vignettes/Helmet"
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
      <ArticleWrapper>
        <Helmet>
          <title>{CARD_ERRORS.ARTICLE.title}</title>
        </Helmet>
        <HeaderLarge
          pageTitle={CARD_ERRORS.ARTICLE.title}
          pageSubtitle={CARD_ERRORS.ARTICLE.subtitle}
          title={TEXT_ERRORS.CODE_103.error}
        />
        <ArticleSection>
          <p style={{ textAlign: "center" }}>
            You are aloready signed in. Click{" "}
            <strong>
              <Link to={ROUTE_URL_USER_LANDING}>here</Link>
            </strong>{" "}
            to see your stuff.
          </p>
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}

export default withRouter(AlreadyAuthenticated)
