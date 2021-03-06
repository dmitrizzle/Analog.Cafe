import { connect } from "react-redux"
import LazyLoad from "react-lazyload"
import Loadable from "react-loadable"
import React from "react"
import Reader from "@roast-cms/french-press-editor/dist/components/vignettes/Reader"

import { HOST_PROD } from "../../../../constants"
import { ROUTE_API_LIST, ROUTE_TAGS } from "../../../constants/routes-list"
import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../constants/routes-article"
import { addSessionInfo } from "../../../../user/store/actions-user"
import {
  fetchArticlePage,
  setArticlePage
} from "../../../store/actions-article"
import { fetchListPage } from "../../../store/actions-list"
import { getListMeta } from "../../../utils/messages-list"
import {
  getSubmissionOrArticleRoute,
  preloadConstructor
} from "../../../utils/routes-article"
import { getTitleFromSlug } from "../../../utils/messages-"
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

// NOTE: 'Component' rather than 'PureComponent' is required for the
// shouldComponentUpdate (for selection) method below.
class Article extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
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
    // window.addEventListener("mouseup", () => {
    //   this.props.setArticleSelectoin({
    //     hidden: true
    //   })
    // })
  }
  componentWillReceiveProps = nextProps => {
    if (!nextProps.article) return
    this.makeTag(nextProps)
    this.setState({
      publicationStatus: nextProps.article.status
    })

    const articleId = nextProps.article.id
    let pastReadReceipts = nextProps.user.sessionInfo.readReceipts || []
    if (pastReadReceipts.length > 100) pastReadReceipts.shift()
    const unixTime = Math.round(new Date().getTime() / 1000)
    const alreadyRead =
      pastReadReceipts.filter(
        receipt =>
          receipt.articleId === articleId && receipt.readOn > unixTime - 10
      ).length > 0

    if (!alreadyRead && articleId) {
      const readReceipts = [
        ...pastReadReceipts,
        {
          articleId,
          readOn: unixTime
        }
      ]
      nextProps.addSessionInfo({ readReceipts })
    }

    if (articleId !== this.props.article.id) {
      this.props.fetchListPage(getListMeta("/", 1, ROUTE_API_LIST).request)
    }
  }
  componentWillUnmount = () => {
    this.unlisten()
  }
  handleSubscribeFormCallback = value => {
    this.setState({
      subscribeForm: !value
    })
  }

  render = () => {
    return (
      <React.Fragment>
        <ArticleWrapper>
          <MetaTags
            metaTitle={
              this.props.article.title +
              (this.props.article.subtitle
                ? `${
                    !this.props.article.title[
                      this.props.article.title.length - 1
                    ].match(/[.,!?:…*ʔっ)]/g)
                      ? ":"
                      : ""
                  } ${this.props.article.subtitle}`
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
          <ArticleHeader article={this.props.article} user={this.props.user} />
          <ArticleSection
            articleStatus={this.props.article.status}
            // onMouseUp={event => this.handleSelection(event, false)}
            // onTouchEnd={event => this.handleSelection(event, true)}
          >
            <Reader
              options={{ domain: HOST_PROD }}
              value={this.props.article.content.raw}
              components={{ Picture }}
            />

            {this.props.article.poster && this.props.article.submittedBy && (
              <LazyLoad
                once
                offset={300}
                height={"100%"}
                key={`ArticleActions_${this.props.article.slug}`}
              >
                <ArticleActions
                  user={this.props.user}
                  list={this.props.list}
                  article={this.props.article}
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
                    this.props.setArticlePage(
                      preloadConstructor(this.props.article, nextArticleHeading)
                    )
                  }
                />
              </LazyLoad>
            )}
          </ArticleSection>
        </ArticleWrapper>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    article: state.article,
    user: state.user,
    list: state.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchArticlePage: request => {
      dispatch(fetchArticlePage(request))
    },
    fetchListPage: (request, appendItems) => {
      dispatch(fetchListPage(request, appendItems))
    },
    setArticlePage: nextArticle => {
      dispatch(setArticlePage(nextArticle))
    },
    addSessionInfo: sessionInfo => {
      dispatch(addSessionInfo(sessionInfo))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
