import { Helmet } from "react-helmet"
import React from "react"

import { CARD_ERRORS } from "../../constants/messages-"
import { TEXT_ERRORS } from "../../../constants"
import ArticleSection from "./Article/components/ArticleSection"
import ArticleWrapper from "./Article/components/ArticleWrapper"
import HeaderLarge from "../vignettes/HeaderLarge"
import Link from "../controls/Link"

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
      <ArticleWrapper>
        <Helmet>
          <title>{CARD_ERRORS.ARTICLE.title}</title>
        </Helmet>
        <HeaderLarge
          pageTitle={CARD_ERRORS.ARTICLE.title}
          pageSubtitle={CARD_ERRORS.ARTICLE.subtitle}
          title={TEXT_ERRORS.CODE_403.error}
        />
        <ArticleSection>
          <p style={{ textAlign: "center" }}>
            Click{" "}
            <strong>
              <Link to="/">here</Link>
            </strong>{" "}
            to go to homepage.
          </p>
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
