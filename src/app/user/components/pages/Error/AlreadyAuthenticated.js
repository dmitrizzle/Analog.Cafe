import React from "react"

import { withRouter } from "react-router"

import {
  Article,
  Section
} from "../../../../core/components/styles/ArticleStyles"
import { CARD_ERRORS } from "../../../../core/constants/messages-"
import { ROUTE_URL_USER_LANDING } from "../../../constants/routes-session"
import { TEXT_ERRORS } from "../../../../constants"
import Heading from "../../../../core/components/vignettes/ArticleHeading"
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
      <Article>
        <Helmet>
          <title>{CARD_ERRORS.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={CARD_ERRORS.ARTICLE.title}
          pageSubtitle={CARD_ERRORS.ARTICLE.subtitle}
          title={TEXT_ERRORS.CODE_103.error}
        />
        <Section>
          <p style={{ textAlign: "center" }}>
            You are aloready signed in. Click{" "}
            <strong>
              <Link to={ROUTE_URL_USER_LANDING}>here</Link>
            </strong>{" "}
            to see your stuff.
          </p>
        </Section>
      </Article>
    )
  }
}

export default withRouter(AlreadyAuthenticated)
