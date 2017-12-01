// tools
import React from "react"
import Loadable from "react-loadable"
import { Editor } from "slate-react"
import { Value } from "slate"
import Helmet from "../../components/_async/Helmet"
import { froth } from "../../../utils/image-froth"
import Link from "../../components/Link"
import slugToTitle from "../../../utils/slug-to-title"

// redux & state
import { connect } from "react-redux"
import {
  fetchPage,
  setPage as setNextArticle
} from "../../../actions/articleActions"
import {
  ROUTE_ARTICLE_API,
  ROUTE_ARTICLE_DIR
} from "../../../constants/article"
import { ROUTE_AUTHOR_API } from "../../../constants/author"
import {
  ROUTE_APP_PRODUCTION_DOMAIN_PROTOCOL,
  ROUTE_APP_PRODUCTION_DOMAIN_NAME
} from "../../../constants/app"
import { ROUTE_FILTERS } from "../../../constants/list"

import { schema } from "../Composer/containers/ContentEditor/schema"
import {
  renderNode,
  renderMark
} from "../Composer/containers/ContentEditor/render"

// components
import Heading from "../../components/ArticleHeading"
import { ModalDispatch } from "../Modal"
import {
  Section,
  Article as ArticleElement,
  Byline
} from "../../components/ArticleStyles"

const ArticleActions = Loadable({
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
  constructor(props) {
    super(props)
    this.state = {
      shareButtons: false,
      subscribeForm: false,
      tag: {
        name: "Post",
        route: "/"
      }
    }
  }

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

    // reset article actions menu
    this.setState({
      shareButtons: false,
      subscribeForm: false
    })
  }

  makeTag = props => {
    const tag = props.article.tag
    if (typeof tag === "undefined") return
    this.setState({
      ...this.state,
      tag: {
        name:
          tag.charAt(0).toUpperCase() +
          slugToTitle(tag, { titleCase: false }).slice(1),
        route: Object.keys(ROUTE_FILTERS).find(
          key => ROUTE_FILTERS[key] === tag
        )
      }
    })
  }
  componentDidMount = () => {
    this.unlisten = this.props.history.listen(location => this.fetchPage())
    this.fetchPage()
    this.makeTag(this.props)
  }
  componentWillReceiveProps = nextProps => {
    this.makeTag(nextProps)

    // article loaded, load articleActions
    if (nextProps.article.status !== "loading")
      this.setState({
        showArticleActions: true
      })
  }
  componentWillUnmount = () => {
    this.unlisten()
  }

  handleRevealSubscribeForm = event => {
    event.preventDefault()
    this.setState({
      subscribeForm: !this.state.subscribeForm,
      shareButtons: false
    })
  }
  handleRevealShareButtons = () => {
    this.setState({
      shareButtons: !this.state.shareButtons,
      subscribeForm: false
    })
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
              ? " (" + this.props.article.subtitle + ")"
              : "") +
            "” by " +
            this.props.article.author.name
        ) +
        "&via=analog_cafe",
      "_blank",
      "height=600,width=500"
    )
  }
  render = () => {
    return (
      <ArticleElement>
        <Helmet>
          <title>{this.props.article.title}</title>
          <meta name="description" content={this.props.article.summary} />
          <meta property="og:title" content={this.props.article.title} />
          <meta
            property="og:description"
            content={this.props.article.summary}
          />
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
          {this.props.article.author &&
            this.props.article.author.name &&
            this.props.article.tag && (
              <Byline>
                <Link
                  to={this.state.tag.route}
                  style={{ textDecoration: "none" }}
                >
                  <strong>{this.state.tag.name}</strong>
                </Link>{" "}
                by{" "}
                {this.props.article.author.id ? (
                  <ModalDispatch
                    with={{
                      request: {
                        url:
                          ROUTE_AUTHOR_API + "/" + this.props.article.author.id
                      }
                    }}
                  >
                    {this.props.article.author.name}
                  </ModalDispatch>
                ) : (
                  this.props.article.author.name
                )}.
              </Byline>
            )}
        </Heading>
        <Section articleStatus={this.props.article.status}>
          <Editor
            readOnly={true}
            value={Value.fromJSON(this.props.article.content.raw)}
            schema={schema}
            renderNode={renderNode}
            renderMark={renderMark}
          />

          {this.state.showArticleActions &&
            this.props.article.poster &&
            this.props.article.author && (
              <ArticleActions
                shareButtons={this.state.shareButtons}
                subscribeForm={this.state.subscribeForm}
                revealShareButtons={this.handleRevealShareButtons}
                revealSubscribeForm={this.handleRevealSubscribeForm}
                shareOnFacebook={this.handleShareOnFacebook}
                shareOnTwitter={this.handleShareOnTwitter}
                nextArticle={this.props.article.next}
                thisArticle={this.props.article.slug}
                thisArticlePostDate={this.props.article["post-date"]}
                nextArticleHeading={nextArticleHeading =>
                  this.props.setNextArticle({
                    title: nextArticleHeading.title,
                    subtitle: nextArticleHeading.subtitle,
                    author: nextArticleHeading.author,
                    slug: nextArticleHeading.slug,
                    poster: nextArticleHeading.poster,
                    tag: nextArticleHeading.tag
                  })
                }
              />
            )}
        </Section>
      </ArticleElement>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    article: state.article
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPage: request => {
      dispatch(fetchPage(request))
    },
    setNextArticle: nextArticle => {
      dispatch(setNextArticle(nextArticle))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article)
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
