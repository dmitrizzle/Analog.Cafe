// tools
import React from "react"
import Loadable from "react-loadable"
import { Editor } from "slate-react"
import { State } from "slate"
import Helmet from "react-helmet"
import { froth } from "../../../utils/image-froth"

// redux & state
import { connect } from "react-redux"
import { fetchPage } from "../../../actions/articleActions"
import {
  ROUTE_ARTICLE_API,
  ROUTE_ARTICLE_DIR
} from "../../../constants/article"
import { ROUTE_AUTHOR_API } from "../../../constants/author"
import {
  ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL,
  ROUTE_APP_PRODUCTION_DOMAIN_NAME
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

const AsyncArticleActions = Loadable({
  loader: () => import("../../components/Card/components/ArticleActions"),
  loading: () => null,
  delay: 100
})

// render
const safeRoute = url => {
  return encodeURI(
    ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL +
      ROUTE_APP_PRODUCTION_DOMAIN_NAME +
      ROUTE_ARTICLE_DIR +
      "/" +
      url
  )
}
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
  handleShareOnFacebook = event => {
    event.preventDefault()
    window.open(
      "https://web.facebook.com/sharer.php?u=" +
        safeRoute(this.props.article.slug),
      "_blank",
      "height=600,width=500"
    )
  }
  handleShareOnTwitter = event => {
    event.preventDefault()
    window.open(
      "https://twitter.com/share?url=" +
        safeRoute(this.props.article.slug) +
        "&text=" +
        encodeURI(
          "“" +
            this.props.article.title +
            (this.props.article.subtitle
              ? ": " + this.props.article.subtitle
              : "") +
            "” by " +
            this.props.article.author.name
        ) +
        "&via=analog_cafe",
      "_blank",
      "height=600,width=500"
    )
  }
  handleNextArticle = () => {}
  render = () => {
    return (
      <ArticleElement>
        <Helmet>
          <title>{this.props.article.title}</title>
          <meta name="description" content={this.props.article.summary} />
          {this.props.article.poster && (
            <meta
              property="og:image"
              content={froth({ src: this.props.article.poster, size: "m" }).src}
            />
          )}
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
            state={State.fromJSON(this.props.article.content.raw)}
            schema={schema}
          />

          {this.props.article.poster &&
            this.props.article.author && (
              <AsyncArticleActions
                shareOnFacebook={this.handleShareOnFacebook}
                shareOnTwitter={this.handleShareOnTwitter}
                nextArticle={this.props.article.nextArticle}
                thisArticle={this.props.article.slug}
                thisArticlePostDate={this.props.article["post-date"]}
              />
            )}
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
