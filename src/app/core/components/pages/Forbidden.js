import React from "react"

import { withRouter } from "react-router"

import { Article, Section } from "../styles/ArticleStyles"
import Helmet from "../vignettes/Helmet"
import Link from "../controls/Link"
import errorMessages from "../../../user/constants/errors"
import Heading from "../vignettes/ArticleHeading"

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
      <Article>
        <Helmet>
          <title>{errorMessages.VIEW_TEMPLATE.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={errorMessages.VIEW_TEMPLATE.ARTICLE.title}
          pageSubtitle={errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle}
          title={errorMessages.DISAMBIGUATION.CODE_403.error}
        />{" "}
        <Section>
          <p style={{ textAlign: "center" }}>
            You need to{" "}
            <strong>
              <Link to="/sign-in">sign in</Link>
            </strong>{" "}
            to view this page.
          </p>
        </Section>
      </Article>
    )
  }
}

export default withRouter(NotFound)
