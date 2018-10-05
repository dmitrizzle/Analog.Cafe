import { connect } from "react-redux"
import LazyLoad from "react-lazyload"
import Loadable from "react-loadable"
import React from "react"

import { ROUTE_TAGS } from "../../../constants/routes-list"
import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../constants/routes-article"
import {
  fetchArticlePage,
  setArticlePage
} from "../../../store/actions-article"
import { getSubmissionOrArticleRoute } from "../../../utils/routes-article"
import { getTitleFromSlug } from "../../../utils/messages-"
import ArticleHeader from "./components/ArticleHeader"
import ArticleSection from "./components/ArticleSection"
import ArticleWrapper from "./components/ArticleWrapper"
import MetaTags from "../../vignettes/MetaTags"
import renderArticle from "../../../utils/render-article"

const ArticleActions = Loadable({
  loader: () => import("../../controls/ArticleActions"),
  loading: () => null,
  delay: 100
})
class Article extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      subscribeForm: false,
      tag: {
        name: "Post",
        route: "/"
      },
      publicationStatus: this.props.article.status,
      selection: {
        leftOffset: 0,
        topOffset: 0
      }
    }
  }
  fetchArticlePage = () => {
    if (
      !this.props.history.location.pathname.includes(ROUTE_URL_ARTICLES) &&
      !this.props.history.location.pathname.includes(ROUTE_URL_SUBMISSIONS)
    )
      return
    this.props.fetchArticlePage({
      url:
        getSubmissionOrArticleRoute(this.props.history.location.pathname)
          .apiRoute +
        this.props.history.location.pathname.replace(
          getSubmissionOrArticleRoute(this.props.history.location.pathname)
            .pathname,
          ""
        )
    })
    this.setState({
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
        name: getTitleFromSlug(tag, {
          titleCase: false,
          capitalize: true,
          smartTagFromImageCount: props.article.stats
            ? props.article.stats.images
            : 0
        }),
        route: Object.keys(ROUTE_TAGS).find(key => ROUTE_TAGS[key] === tag)
      }
    })
  }
  componentDidMount = () => {
    this.unlisten = this.props.history.listen(() => this.fetchArticlePage())
    this.fetchArticlePage()
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
  handleSubscribeFormCallback = value => {
    this.setState({
      subscribeForm: !value
    })
  }

  handleMouseUp = event => {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const menu = {
      offsetWidth: 100,
      offsetHeight: 20
    }
    const leftOffset =
      rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2
    const topOffset = rect.top + window.scrollY - menu.offsetHeight + 3
    this.setState({
      selection: {
        leftOffset,
        topOffset
      }
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return true
    } else {
      return false
    }
  }

  render = () => {
    return (
      <ArticleWrapper>
        <MetaTags
          metaTitle={
            this.props.article.title +
            (this.props.article.subtitle
              ? ` (${this.props.article.subtitle})`
              : "")
          }
          metaDescription={this.props.article.summary}
          metaImage={this.props.article.poster}
          metaPostDate={
            this.props.article.date && this.props.article.date.published
          }
          metaEditDate={
            this.props.article.date && this.props.article.date.updated
          }
          metaAuthors={this.props.article.authors}
          metaSlug={this.props.article.slug}
          metaArticleSchema
        />
        <ArticleHeader
          article={this.props.article}
          stateAdminControls={this.state.adminControls}
          stateTag={this.state.tag}
        />
        <ArticleSection
          articleStatus={this.props.article.status}
          onMouseUp={this.handleMouseUp}
        >
          <div
            style={{
              width: "100px",
              height: "20px",
              background: "#000",
              position: "absolute",
              top: `${this.state.selection.topOffset}px`,
              left: `${this.state.selection.leftOffset}px`
            }}
          />
          {renderArticle(this.props.article.content.raw)}
          {this.props.article.poster &&
            this.props.article.submittedBy && (
              <LazyLoad
                once
                offset={300}
                height={"100%"}
                key={`ArticleActions_${this.props.article.slug}`}
              >
                <ArticleActions
                  user={this.props.user}
                  subscribeFormCallback={this.handleSubscribeFormCallback}
                  subscribeForm={this.state.subscribeForm}
                  nextArticle={this.props.article.next}
                  thisArticle={this.props.article.slug}
                  thisArticlePostDate={
                    this.props.article.date && this.props.article.date.published
                  }
                  thisArticleEditDate={
                    this.props.article.date && this.props.article.date.updated
                  }
                  nextArticleHeading={nextArticleHeading =>
                    this.props.setArticlePage({
                      title: nextArticleHeading.title,
                      subtitle: nextArticleHeading.subtitle,
                      authors: nextArticleHeading.authors,
                      slug: nextArticleHeading.slug,
                      poster: nextArticleHeading.poster,
                      tag: nextArticleHeading.tag
                    })
                  }
                />
              </LazyLoad>
            )}
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}
const mapStateToProps = state => {
  return {
    article: state.article,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchArticlePage: request => {
      dispatch(fetchArticlePage(request))
    },
    setArticlePage: nextArticle => {
      dispatch(setArticlePage(nextArticle))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
