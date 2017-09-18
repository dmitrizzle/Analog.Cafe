// tools
import React from "react"
import { Editor, Raw } from "slate"
import Helmet from "react-helmet"

// redux & state
import { connect } from "react-redux"
import { fetchPage } from "../../../actions/articleActions"
import {
  ROUTE_ARTICLE_API,
  ROUTE_ARTICLE_DIR
} from "../../../constants/article"
import { ROUTE_AUTHOR_API } from "../../../constants/author"
import {
  ROUTE_APP_PRODUCTION_DOMAIN_NAME,
  ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL
} from "../../../constants/app"

import { schema } from "../Composer/containers/ContentEditor/schema"

// components
import Heading from "../../components/ArticleHeading"
import { ModalDispatch } from "../Modal"
import {
  Section,
  Article as ArticleElement,
  Byline
} from "../../components/ArticleStyles"

// render
class Article extends React.PureComponent {
  fetchPage = () => {
    // do not fetch pages unless they are located in /zine dir
    // otherwise on unmount the component will try to load any page, and return 404 errors
    if (!this.props.history.location.pathname.includes(ROUTE_ARTICLE_DIR))
      return

    this.props.fetchPage({
      url:
        ROUTE_ARTICLE_API +
        this.props.history.location.pathname.replace(ROUTE_ARTICLE_DIR, "")
    })
  }
  componentDidMount = () => {
    this.unlisten = this.props.history.listen(location => this.fetchPage())
    this.fetchPage()
  }
  componentWillUnmount = () => {
    this.unlisten()
  }
  render = () => {
    return (
      <ArticleElement>
        <Helmet>
          <title>{this.props.article.title}</title>
          <meta name="description" content={this.props.article.summary} />
          <meta
            property="og:image"
            content={
              this.props.article.poster &&
              ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL +
                ROUTE_APP_PRODUCTION_DOMAIN_NAME +
                this.props.article.poster.medium
            }
          />
        </Helmet>
        <Heading
          pageTitle={this.props.article.title}
          pageSubtitle={this.props.article.subtitle}
          title={this.props.article.error && this.props.article.error}
        >
          {this.props.article.status === "published" && (
            <Byline>
              by{" "}
              <ModalDispatch
                with={{
                  request: {
                    url: ROUTE_AUTHOR_API + "/" + this.props.article.author.id
                  }
                }}
              >
                {this.props.article.author.name}
              </ModalDispatch>
            </Byline>
          )}
        </Heading>
        <Section articleStatus={this.props.article.status}>
          <Editor
            readOnly={true}
            state={Raw.deserialize(this.props.article.content.raw, {
              terse: true
            })}
            schema={schema}
          />
        </Section>
      </ArticleElement>
    )
  }
}

// connet with redux
const mapStateToProps = state => {
  return {
    article: state.article
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPage: request => {
      dispatch(fetchPage(request))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article)
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
