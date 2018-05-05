import { Reader } from "@roast-cms/french-press-editor/dist/components/Reader"
import { connect } from "react-redux"
import LazyLoad from "react-lazyload"
import Loadable from "react-loadable"
import React from "react"

import { HOST_PROD } from "../../../../constants"
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
import { shareOnFacebook, shareOnTwitter } from "../../../utils/actions-article"
import ArticleHeader from "./components/ArticleHeader"
import ArticleSection from "./components/ArticleSection"
import ArticleWrapper from "./components/ArticleWrapper"
import MetaTags from "../../vignettes/MetaTags"
import Picture from "../../vignettes/Picture"

const ArticleActions = Loadable({
  loader: () => import("../../controls/ArticleActions"),
  loading: () => null,
  delay: 100
})
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
      shareButtons: value,
      subscribeForm: !value
    })
  }
  handleRevealShareButtons = () => {
    this.setState({
      shareButtons: !this.state.shareButtons,
      subscribeForm: false
    })
  }
  handleShareOnTwitter = event => {
    shareOnTwitter(event)
  }
  handleShareOnFacebook = event => {
    shareOnFacebook(event)
  }

  render = () => {
    return (
      <ArticleWrapper>
        <MetaTags
          metaTitle={this.props.article.title}
          metaDescription={this.props.article.summary}
          metaImage={this.props.article.poster}
        />
        <ArticleHeader
          article={this.props.article}
          stateAdminControls={this.state.adminControls}
          stateTag={this.state.tag}
        />

        <ArticleSection articleStatus={this.props.article.status}>
          <Reader
            value={this.props.article.content.raw}
            options={{
              domain: HOST_PROD
            }}
            components={{
              Picture
            }}
          />

          {this.props.article.poster &&
            this.props.article.submittedBy && (
              <LazyLoad
                once
                offset={300}
                height={"100%"}
                key={`ArticleActions_${this.props.article.slug}`}
              >
                <ArticleActions
                  subscribeFormCallback={this.handleSubscribeFormCallback}
                  revealShareButtons={this.handleRevealShareButtons}
                  subscribeForm={this.state.subscribeForm}
                  shareButtons={this.state.shareButtons}
                  hideShareButtons={this.props.article.status !== "published"}
                  shareOnFacebook={this.handleShareOnFacebook}
                  shareOnTwitter={this.handleShareOnTwitter}
                  nextArticle={this.props.article.next}
                  thisArticle={this.props.article.slug}
                  thisArticlePostDate={
                    this.props.article.date && this.props.article.date.published
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
export default connect(mapStateToProps, mapDispatchToProps)(Article)
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
