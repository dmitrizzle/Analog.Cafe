// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import Loadable from "react-loadable"

// redux & state
import { connect } from "react-redux"
import {
  fetchPage,
  setPage as setNextArticle
} from "../../../actions/articleActions"
import ArticleActions from "../../components/Card/components/ArticleActions"

// constants
import {
  ROUTE_ARTICLE_DIR,
  ROUTE_SUBMISSIONS_DIR
} from "../../../constants/article"
import { ROUTE_AUTHOR_API } from "../../../constants/author"
import { ROUTE_TAGS } from "../../../constants/list"
import emojis from "../../../constants/messages/emojis"

// Slate stuff
import { schema } from "../Composer/containers/ContentEditor/schema"
import {
  renderNode,
  renderMark
} from "../Composer/containers/ContentEditor/render"

// components
import Helmet from "../../components/_async/Helmet"
import Link from "../../components/_controls/Link"
import Heading from "../../components/ArticleHeading"
import { ModalDispatch } from "../Modal"
import {
  Section,
  Article as ArticleElement,
  Byline
} from "../../components/ArticleStyles"

// helpers
import { froth } from "../../../utils/image-froth"
import slugToTitle from "../../../utils/slug-to-title"
import { getLeadAuthor, authorNameList } from "../../../utils/authorship"
import { locate, completeUrlPath } from "../../../utils/article-utils"

// admin controls loader
const AdminControls = Loadable({
  loader: () => import("./containers/AdminControls"),
  loading: () => null,
  delay: 100
})

// render
class Article extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      shareButtons: false,
      subscribeForm: false,
      tag: {
        name: "Post",
        route: "/"
      },
      publicationStatus: this.props.article.status
    }
  }

  fetchPage = () => {
    // do not fetch pages unless they are located in /zine or /submissions dir
    // otherwise on unmount the component will try to load any page, and return 404 errors
    if (
      !this.props.history.location.pathname.includes(ROUTE_ARTICLE_DIR) &&
      !this.props.history.location.pathname.includes(ROUTE_SUBMISSIONS_DIR)
    )
      return

    this.props.fetchPage({
      url:
        locate(this.props.history.location.pathname).apiRoute +
        this.props.history.location.pathname.replace(
          locate(this.props.history.location.pathname).pathname,
          ""
        )
    })

    // reset article actions menu
    this.setState({
      shareButtons: false,
      subscribeForm: false,
      publicationStatus: this.props.article.status
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
        route: Object.keys(ROUTE_TAGS).find(key => ROUTE_TAGS[key] === tag)
      }
    })
  }
  componentDidMount = () => {
    this.unlisten = this.props.history.listen(location => this.fetchPage())
    this.fetchPage()
    this.makeTag(this.props)
    this.setState({
      adminControls: this.props.user.info.role === "admin"
    })
  }
  componentWillReceiveProps = nextProps => {
    this.makeTag(nextProps)
    this.setState({
      adminControls: nextProps.user.info.role === "admin",
      publicationStatus: nextProps.article.status
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
        completeUrlPath(
          locate(this.props.history.location.pathname).pathname,
          this.props.article.slug
        ),
      "_blank",
      "height=600,width=500"
    )
  }
  handleShareOnTwitter = event => {
    event.preventDefault()
    window.open(
      "https://twitter.com/share?url=" +
        completeUrlPath(
          locate(this.props.history.location.pathname).pathname,
          this.props.article.slug
        ) +
        "&text=" +
        encodeURI(
          "“" +
            this.props.article.title +
            (this.props.article.subtitle
              ? " (" + this.props.article.subtitle + ")"
              : "") +
            "” by " +
            authorNameList(this.props.article.authors)
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
          {this.props.article.authors &&
            this.props.article.authors[0].name && (
              <Byline>
                <Link to={this.state.tag.route}>{this.state.tag.name}</Link> by{" "}
                {getLeadAuthor(this.props.article.authors).id ? (
                  <ModalDispatch
                    with={{
                      request: {
                        url:
                          ROUTE_AUTHOR_API +
                          "/" +
                          getLeadAuthor(this.props.article.authors).id
                      }
                    }}
                  >
                    {getLeadAuthor(this.props.article.authors).name}
                  </ModalDispatch>
                ) : (
                  getLeadAuthor(this.props.article.authors).name
                )}
                {this.props.article.authors.length > 1 &&
                  ` with images by ${authorNameList(
                    this.props.article.authors,
                    { ommitLeadAuthor: true, keepFullNames: true }
                  )}`}.
              </Byline>
            )}
          {this.props.article.author &&
            this.props.article.status !== "published" &&
            this.props.article.status !== "loading" && (
              <Byline>
                <br />
                <span style={{ fontStyle: "normal" }}>
                  {" "}
                  {emojis.WARNING}
                </span>{" "}
                This submission is only visible to you and the Analog.Cafe
                Editors.
              </Byline>
            )}
          {this.state.adminControls && <AdminControls />}
        </Heading>
        <Section articleStatus={this.props.article.status}>
          <Editor
            readOnly={true}
            value={Value.fromJSON(this.props.article.content.raw)}
            schema={schema}
            renderNode={renderNode}
            renderMark={renderMark}
          />

          {this.props.article.poster &&
            this.props.article.author && (
              <ArticleActions
                hideShareButtons={this.props.article.status !== "published"}
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
                    authors: nextArticleHeading.authors,
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
    article: state.article,
    user: state.user
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
