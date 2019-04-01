import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"

import { withRouter } from "react-router"

import { GA } from "../../../../utils"
import { fetchListPage, initListPage } from "../../../store/actions-list"
import { getListMeta } from "../../../utils/messages-list"
import { preloadConstructor } from "../../../utils/routes-article"
import { setArticlePage } from "../../../store/actions-article"
import { setUserIntent } from "../../../../user/store/actions-user"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import Button from "../../controls/Button/components/Button"
import HeaderLarge from "../../vignettes/HeaderLarge"
import ListBlock from "./components/ListBlock"
import ListDescription from "./components/ListDescription"
import MetaTags from "../../vignettes/MetaTags"

const ListAugmented = Loadable({
  loader: () => import("../../../../user/components/pages/ListAugmented"),
  loading: () => (
    <ArticleWrapper>
      <HeaderLarge pageTitle=" " />
    </ArticleWrapper>
  )
})

class List extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadMorePending: false
    }
  }
  fetchNewList = () => {
    const request = getListMeta(this.props.history.location.pathname, 1).request
    this.props.fetchListPage(request)
  }
  handleLoadMore = event => {
    event.preventDefault()
    const request = getListMeta(
      this.props.history.location.pathname,
      parseInt(this.props.list.page.current, 0) + 1
    ).request
    this.props.fetchListPage(request, true)
    this.setState({
      loadMorePending: true
    })
    GA.event({
      category: "Navigation",
      action: "List.load_more"
    })
  }
  handleUserIntent = () => {
    if (this.props.list.status === "loading") return
    this.props.setUserIntent({ load: "Article" })
  }
  componentWillReceiveProps = () => {
    this.setState({
      loadMorePending: false
    })
  }
  componentDidMount = () => {
    //this.props.initListPage();
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

    const isUserDashboard = this.props.me
    const isUserFavourites = this.props.favourites
    const isProfilePage =
      this.props.location.pathname.includes("/is/") ||
      isUserDashboard ||
      isUserFavourites

    let profileImage
    if (this.props.list.author) {
      profileImage =
        this.props.list.author.image || "image-froth_1000000_SJKoyDgUV"
      if (!isUserDashboard && !this.props.list.author.image) profileImage = null
    }

    const doesAuthorHaveLink =
      this.props.list.author &&
      this.props.list.author.buttons[1] &&
      this.props.list.author.buttons[1].text

    const listAugmentedProps = {
      isProfilePage,
      isUserDashboard,
      isUserFavourites,
      profileImage,
      doesAuthorHaveLink
    }

    return (
      <div>
        <MetaTags
          metaTitle={renderedListTitle}
          metaDescription={renderedListMeta.description}
        />
        {!isProfilePage && (
          <ListDescription
            user={this.props.user}
            list={this.props.list}
            renderedListMeta={renderedListMeta}
            location={this.props.location}
          />
        )}
        <React.Fragment>
          {isProfilePage && (
            <ListAugmented {...this.props} {...listAugmentedProps} />
          )}
          <ListBlock
            status={this.props.list.status}
            items={this.props.list.items}
            author={isProfilePage}
            nextArticleHeading={nextArticleHeading =>
              this.props.setArticlePage(
                preloadConstructor(this.props.article, nextArticleHeading)
              )
            }
            private={this.props.private}
            isAdmin={this.props.isAdmin}
            userIntent={this.handleUserIntent}
            article={this.props.article}
            readReceipts={this.props.user.sessionInfo.readReceipts}
            noNegativeMargin={
              !this.props.list.items ||
              this.props.list.items.length === 0 ||
              this.props.list.items[0].type === "placeholder"
            }
            {...listAugmentedProps}
          />
        </React.Fragment>
        {parseInt(this.props.list.page.total, 0) > 1 &&
        parseInt(this.props.list.page.total, 0) >
          parseInt(this.props.list.page.current, 0) ? (
          <Button
            branded
            onClick={this.handleLoadMore}
            loading={this.state.loadMorePending ? true : false}
          >
            Load More
          </Button>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    user: state.user,
    article: state.article
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchListPage: (request, appendItems) => {
      dispatch(fetchListPage(request, appendItems))
    },
    initListPage: state => {
      dispatch(initListPage(state))
    },
    setArticlePage: nextArticle => {
      dispatch(setArticlePage(nextArticle))
    },
    setUserIntent: intent => {
      dispatch(setUserIntent(intent))
    }
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(List)
)
