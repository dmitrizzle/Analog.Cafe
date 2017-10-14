// tools
import React from "react"
import { withRouter } from "react-router"
import { ModalDispatch } from "../Modal"
import Helmet from "../../components/_async/AsyncHelmet"

// redux & state
import { connect } from "react-redux"
import { fetchPage } from "../../../actions/listActions"
import { setPage as setNextArticle } from "../../../actions/articleActions"
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
    this.props.fetchPage(
      getListMeta(this.props.history.location.pathname, 1, this.listAPI).request
    )
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
        ? this.props.list.filter.author.name
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

        <ListBlock
          status={this.props.list.status}
          items={this.props.list.items}
          nextArticleHeading={nextArticleHeading =>
            this.props.setNextArticle({
              title: nextArticleHeading.title,
              subtitle: nextArticleHeading.subtitle,
              author: nextArticleHeading.author,
              slug: nextArticleHeading.slug,
              poster: nextArticleHeading.poster
            })}
          private={this.props.private}
        />

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

// connet with redux
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
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
