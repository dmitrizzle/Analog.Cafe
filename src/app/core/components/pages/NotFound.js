import React from "react"

import { Article, Section } from "../styles/ArticleStyles"
import Heading from "../vignettes/ArticleHeading"
import Helmet from "../vignettes/Helmet"
import Link from "../controls/Link"
import errorMessages from "../../../user/constants/errors"

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
          <title>{errorMessages.VIEW_TEMPLATE.ARTICLE.title}</title>
        </Helmet>
        <Heading
          pageTitle={errorMessages.VIEW_TEMPLATE.ARTICLE.title}
          pageSubtitle={errorMessages.VIEW_TEMPLATE.ARTICLE.subtitle}
          title={errorMessages.DISAMBIGUATION.CODE_403.error}
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
