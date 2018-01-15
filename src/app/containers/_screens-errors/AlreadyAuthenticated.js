// tools
import React from "react"
import { withRouter } from "react-router"
import Helmet from "../../components/_async/Helmet"

// components
import Link from "../../components/_controls/Link"
import Heading from "../../components/ArticleHeading"
import { Article, Section } from "../../components/ArticleStyles"

import errorMessages from "../../../constants/messages/errors"
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
