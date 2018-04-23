import React from "react"

import { withRouter } from "react-router"

import { Article, Section } from "../styles/ArticleStyles"
import { CARD_ERRORS, TEXT_ERRORS } from "../../constants/messages-"
import Heading from "../vignettes/ArticleHeading"
import Helmet from "../vignettes/Helmet"
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
      <Article>
        <Helmet>
          <title>{CARD_ERRORS.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={CARD_ERRORS.ARTICLE.title}
          pageSubtitle={CARD_ERRORS.ARTICLE.subtitle}
          title={TEXT_ERRORS.CODE_403.error}
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
