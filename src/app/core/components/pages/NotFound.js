import React from "react"

import { Article, Section } from "../styles/ArticleStyles"
import { CARD_ERRORS, TEXT_ERRORS } from "../../constants/messages-"
import Heading from "../vignettes/ArticleHeading"
import Helmet from "../vignettes/Helmet"
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
      <Article>
        <Helmet>
          <title>{CARD_ERRORS.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={CARD_ERRORS.ARTICLE.title}
          pageSubtitle={CARD_ERRORS.ARTICLE.subtitle}
          title={TEXT_ERRORS.CODE_403.error}
        />
        <Section>
          <p style={{ textAlign: "center" }}>
            Click{" "}
            <strong>
              <Link to="/">here</Link>
            </strong>{" "}
            to go to homepage.
          </p>
        </Section>
      </Article>
    )
  }
}
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
