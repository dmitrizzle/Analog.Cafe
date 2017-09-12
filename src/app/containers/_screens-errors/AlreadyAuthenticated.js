// tools
import React from "react"
import { withRouter } from "react-router"
import Helmet from "react-helmet"

// components
import Link from "../../components/Link"
import Heading from "../../components/ArticleHeading"
import { Article, Section } from "../../components/ArticleStyles"

import errorMessage from "../../../constants/error-messages"
import { ROUTE_AUTH_USER_LANDING } from "../../../constants/user"

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
          <title>{errorMessage.VIEW_TEMPLATE.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={errorMessage.VIEW_TEMPLATE.ARTICLE.title}
          pageSubtitle={errorMessage.VIEW_TEMPLATE.ARTICLE.subtitle}
          title={errorMessage.DISAMBIGUATION.CODE_103.error}
        />
        <Section>
          <p style={{ textAlign: "center" }}>
            You are aloready signed in. Click{" "}
            <strong>
              <Link to={ROUTE_AUTH_USER_LANDING}>here</Link>
            </strong>{" "}
            to see your stuff.
          </p>
        </Section>
      </Article>
    )
  }
}

export default withRouter(AlreadyAuthenticated)
