import React from "react"

import { withRouter } from "react-router"

import {
  Article,
  Section
} from "../../../../core/components/styles/ArticleStyles"
import { ROUTE_URL_USER_LANDING } from "../../../constants/user"
import Helmet from "../../../../core/components/vignettes/Helmet"
import Link from "../../../../core/components/controls/Link"
import Heading from "../../../../core/components/vignettes/ArticleHeading"
import errorMessages from "../../../constants/errors"

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
          <title>{errorMessages.VIEW_TEMPLATE.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={errorMessages.VIEW_TEMPLATE.ARTICLE.title}
          pageSubtitle={errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle}
          title={errorMessages.DISAMBIGUATION.CODE_103.error}
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
