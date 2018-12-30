import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"

import { withRouter } from "react-router"

import {
  CardColumns,
  CardIntegratedForColumns
} from "../../controls/ArticleActions/components/Options"
import { GA, makeFroth } from "../../../../utils"
import {
  ROUTE_API_LIST,
  ROUTE_API_LIST_SUBMISSIONS
} from "../../../constants/routes-list"
import { fetchListPage } from "../../../store/actions-list"
import { getListMeta } from "../../../utils/messages-list"
import { preloadConstructor } from "../../../utils/routes-article"
import { setArticlePage } from "../../../store/actions-article"
import { setUserIntent } from "../../../../user/store/actions-user"
import ArticleSection from "../Article/components/ArticleSection"
import Button from "../../controls/Button/components/Button"
import Byline from "../../vignettes/Byline"
import CardButton from "../../controls/Card/components/CardButton"
import CardCaption from "../../controls/Card/components/CardCaption"
import Footer from "../../controls/Footer"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import ListBlock from "./components/ListBlock"
import ListDescription from "./components/ListDescription"
import MetaTags from "../../vignettes/MetaTags"
import Placeholder from "../../vignettes/Picture/components/Placeholder"

const PlaceholderHowToSubmit = Loadable({
  loader: () => import("./components/HowToSubmit"),
  loading: () => null
})

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
      true
    )
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
        <MetaTags
          metaTitle={renderedListTitle}
          metaDescription={renderedListMeta.description}
        />
        <ListDescription
          user={this.props.user}
          list={this.props.list}
          renderedListMeta={renderedListMeta}
          location={this.props.location}
          style={this.props.list.author ? { height: 0, opacity: 0 } : null}
        />
        {this.props.user.connection.status !== "offline" &&
        this.props.list.error &&
        this.props.me ? (
          <PlaceholderHowToSubmit />
        ) : (
          <React.Fragment>
            {this.props.list.author && (
              <ArticleSection
                style={{
                  zIndex: 11,
                  position: "relative"
                }}
              >
                <HeaderLarge pageTitle={this.props.list.author.title}>
                  <Byline>
                    {this.props.list.author &&
                      this.props.user.info.id === this.props.list.author.id && (
                        <React.Fragment>
                          <span style={{ fontStyle: "normal" }}>✐ </span>
                          <Link to="/profile/edit">Edit Profile</Link>
                        </React.Fragment>
                      )}
                  </Byline>
                </HeaderLarge>
                <CardColumns>
                  {this.props.list.author.image && (
                    <CardIntegratedForColumns>
                      <figure>
                        <Placeholder frothId={this.props.list.author.image}>
                          <img
                            src={
                              makeFroth({
                                src: this.props.list.author.image,
                                size: "s"
                              }).src
                            }
                            alt={this.props.list.author.title}
                          />
                        </Placeholder>
                      </figure>
                    </CardIntegratedForColumns>
                  )}
                  {(this.props.list.author.text ||
                    this.props.list.author.buttons[1]) && (
                    <CardIntegratedForColumns>
                      {this.props.list.author.text && (
                        <figcaption style={{ fontSize: ".8em" }}>
                          <CardCaption>
                            {this.props.list.author.text}
                          </CardCaption>
                        </figcaption>
                      )}
                      {this.props.list.author.buttons[1] &&
                        this.props.list.author.buttons[1].text && (
                          <CardButton
                            to={this.props.list.author.buttons[1].to}
                            branded
                          >
                            {this.props.list.author.buttons[1].text}
                          </CardButton>
                        )}
                    </CardIntegratedForColumns>
                  )}
                </CardColumns>
              </ArticleSection>
            )}
            <ListBlock
              status={this.props.list.status}
              items={this.props.list.items}
              author={this.props.list.author ? true : false}
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
            />
          </React.Fragment>
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
        <ArticleSection>
          <Footer />
        </ArticleSection>
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
