import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"

import { withRouter } from "react-router"

import { Article, Section } from "../../styles/ArticleStyles"
import { HEADER_ERRORS } from "../../../../constants"
import { ListDescription, ListHeader } from "../../vignettes/ListDescription"
import Modal from "../../controls/Modal"
import { ROUTE_API_AUTHORS } from "../../../constants/routes-article"
import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS
} from "../../../constants/routes-list"
import { fetchListPage } from "../../../store/actions-list"
import { getFirstNameFromFull } from "../../../utils/messages-author"
import { getListMeta } from "../../../utils/messages-list"
import { setArticlePage } from "../../../store/actions-article"
import { setUserIntent } from "../../../../user/store/actions-user"
import Button from "../../controls/Button/components/Button"
import Helmet from "../../vignettes/Helmet"
import ListBlock from "../../styles/List"

// fetch placeholder component
const HowToSubmit = Loadable({
  loader: () => import("./components/HowToSubmit"),
  loading: () => null
})

// return
class List extends React.PureComponent {
  constructor(props) {
    super(props)
    this.listAPI = this.props.private
      ? ROUTE_API_LIST_SUBMISSIONS
      : ROUTE_API_LIST
    this.state = {
      loadMorePending: false
    }
  }
  fetchNewList = () => {
    // a timeout waits to ensure there's no crowding for requests
    // for example, a request can be initiated through URL change and
    // user interaction at the same time, creating bugs
    // this timeout ensures that all events have been registered and only the
    // final one is followed through
    const controlledFetch = setTimeout(() => {
      this.props.fetchListPage(
        getListMeta(this.props.history.location.pathname, 1, this.listAPI)
          .request
      )
      clearTimeout(controlledFetch)
    }, 50)
  }
  handleLoadMore = event => {
    event.preventDefault()
    this.props.fetchListPage(
      getListMeta(
        this.props.history.location.pathname,
        parseInt(this.props.list.page.current, 0) + 1,
        this.listAPI
      ).request,
      // append items:
      true
    )

    // set loading state on button
    this.setState({
      loadMorePending: true
    })

    // async load Google Analytics module
    import("react-ga").then(ReactGA => {
      ReactGA.event({
        category: "Navigation",
        action: "List.load_more"
      })
    })
  }
  handleUserIntent = () => {
    if (this.props.list.status === "loading") return
    this.props.setUserIntent({ load: "Article" })
  }
  componentWillReceiveProps = () => {
    // reset loading indicator
    this.setState({
      loadMorePending: false
    })
  }
  componentDidMount = () => {
    this.fetchNewList()

    this.unlisten = this.props.history.listen(this.fetchNewList)
  }
  componentWillUnmount = () => {
    this.unlisten()
  }
  render = () => {
    const renderedListMeta = getListMeta(this.props.location.pathname).meta
    const renderedListTitle =
      renderedListMeta.title +
      (this.props.list.filter.author && this.props.list.filter.author.name
        ? " by " + this.props.list.filter.author.name
        : "")
    return (
      <div>
        <Helmet>
          <title>{renderedListTitle}</title>
          <meta name="description" content={renderedListMeta.description} />
          <meta property="og:title" content={renderedListTitle} />
          <meta
            property="og:description"
            content={renderedListMeta.description}
          />
        </Helmet>
        <ListDescription>
          {this.props.user.connection.status !== "offline" ? (
            <ListHeader>
              {this.props.list.filter.author ? (
                <span>
                  <em>
                    {this.props.list.error
                      ? this.props.list.error.title
                      : renderedListMeta.title}
                    {this.props.list.filter.author.name ? " " : null}
                    {this.props.list.filter.author.name ? (
                      <span>
                        by{" "}
                        <Modal
                          with={{
                            request: {
                              url:
                                ROUTE_API_AUTHORS +
                                "/" +
                                this.props.list.filter.author.id
                            }
                          }}
                        >
                          {getFirstNameFromFull(
                            this.props.list.filter.author.name
                          )}
                        </Modal>
                      </span>
                    ) : (
                      this.props.location.pathname.includes("/author/") && ".."
                    )}
                  </em>
                </span>
              ) : (
                <span>
                  <em>{renderedListMeta.title}</em>
                </span>
              )}
              {this.props.list.filter.author &&
              this.props.list.filter.author.name
                ? "."
                : this.props.list.error
                  ? " " + this.props.list.error.emoji
                  : "."}
            </ListHeader>
          ) : (
            <ListHeader>
              <em>{HEADER_ERRORS.LIST_OFFLINE.title}</em>{" "}
              {HEADER_ERRORS.LIST_OFFLINE.emoji}
            </ListHeader>
          )}
        </ListDescription>

        {this.props.user.connection.status !== "offline" &&
        this.props.list.error &&
        this.props.placeholder === "HowToSubmit" ? (
          <HowToSubmit />
        ) : (
          <ListBlock
            status={this.props.list.status}
            items={this.props.list.items}
            nextArticleHeading={nextArticleHeading =>
              this.props.setArticlePage({
                title: nextArticleHeading.title,
                subtitle: nextArticleHeading.subtitle,
                tag: nextArticleHeading.tag,
                authors: nextArticleHeading.authors,
                slug: nextArticleHeading.slug,
                poster: nextArticleHeading.poster
              })
            }
            private={this.props.private}
            isAdmin={this.props.isAdmin}
            userIntent={this.handleUserIntent}
          />
        )}

        {parseInt(this.props.list.page.total, 0) > 1 &&
        parseInt(this.props.list.page.total, 0) >
          parseInt(this.props.list.page.current, 0) ? (
          <Button
            branded
            onClick={this.handleLoadMore.bind(this)}
            loading={this.state.loadMorePending ? true : false}
          >
            Load More
          </Button>
        ) : null}

        <Article>
          <Section />
        </Article>
      </div>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    list: state.list,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchListPage: (request, appendItems) => {
      dispatch(fetchListPage(request, appendItems))
    },
    setArticlePage: nextArticle => {
      dispatch(setArticlePage(nextArticle))
    },
    setUserIntent: intent => {
      dispatch(setUserIntent(intent))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
