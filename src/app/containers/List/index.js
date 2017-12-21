// tools
import React from "react"
import { withRouter } from "react-router"
import { ModalDispatch } from "../Modal"
import Helmet from "../../components/_async/Helmet"
import Loadable from "react-loadable"

// redux & state
import { connect } from "react-redux"
import { fetchPage } from "../../../actions/listActions"
import { setPage as setNextArticle } from "../../../actions/articleActions"
import { setIntent as setUserIntent } from "../../../actions/userActions"

import {
  ROUTE_LIST_API,
  ROUTE_AUTHENTICATED_LIST_API
} from "../../../constants/list"
import { ROUTE_AUTHOR_API } from "../../../constants/author"

// components
import { ListDescription, ListHeader } from "../../components/ListDescription"
import { Button } from "../../components/Button"
import { default as ListBlock } from "../../components/List"
import { Section, Article } from "../../components/ArticleStyles"

// helpers
import { getListMeta, trimAuthorName } from "../../../utils/list-utils"

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
      ? ROUTE_AUTHENTICATED_LIST_API
      : ROUTE_LIST_API
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
      this.props.fetchPage(
        getListMeta(this.props.history.location.pathname, 1, this.listAPI)
          .request
      )
      clearTimeout(controlledFetch)
    }, 50)
  }
  handleLoadMore = event => {
    event.preventDefault()
    this.props.fetchPage(
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
                      <ModalDispatch
                        with={{
                          request: {
                            url:
                              ROUTE_AUTHOR_API +
                              "/" +
                              this.props.list.filter.author.id
                          }
                        }}
                      >
                        {trimAuthorName(this.props.list.filter.author.name)}
                      </ModalDispatch>
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
            {this.props.list.filter.author && this.props.list.filter.author.name
              ? "."
              : this.props.list.error ? " " + this.props.list.error.emoji : "."}
          </ListHeader>
        </ListDescription>

        {this.props.list.error && this.props.placeholder === "HowToSubmit" ? (
          <HowToSubmit />
        ) : (
          <ListBlock
            status={this.props.list.status}
            items={this.props.list.items}
            nextArticleHeading={nextArticleHeading =>
              this.props.setNextArticle({
                title: nextArticleHeading.title,
                subtitle: nextArticleHeading.subtitle,
                tag: nextArticleHeading.tag,
                author: nextArticleHeading.author,
                slug: nextArticleHeading.slug,
                poster: nextArticleHeading.poster
              })
            }
            private={this.props.private}
            userIntent={this.handleUserIntent}
          />
        )}

        {parseInt(this.props.list.page.total, 0) > 1 &&
        parseInt(this.props.list.page.total, 0) >
          parseInt(this.props.list.page.current, 0) ? (
          <Button
            red
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
    list: state.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPage: (request, appendItems) => {
      dispatch(fetchPage(request, appendItems))
    },
    setNextArticle: nextArticle => {
      dispatch(setNextArticle(nextArticle))
    },
    setUserIntent: intent => {
      dispatch(setUserIntent(intent))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
