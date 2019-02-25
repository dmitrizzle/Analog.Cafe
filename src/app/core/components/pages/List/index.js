import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"

import { withRouter } from "react-router"

import {
  CardColumns,
  CardIntegratedForColumns
} from "../../controls/ArticleActions/components/Options"
import { GA, makeFroth } from "../../../../utils"
import { ROUTE_URL_USER_LANDING } from "../../../../user/constants/routes-session"
import { TEXT_EMOJIS } from "../../../../constants"
import { fetchListPage, initListPage } from "../../../store/actions-list"
import { getListMeta } from "../../../utils/messages-list"
import { preloadConstructor } from "../../../utils/routes-article"
import { setArticlePage } from "../../../store/actions-article"
import { setUserIntent } from "../../../../user/store/actions-user"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import Button from "../../controls/Button/components/Button"
import Byline from "../../vignettes/Byline"
import CardButton from "../../controls/Card/components/CardButton"
import CardCaption from "../../controls/Card/components/CardCaption"
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

const ProfileImage = props => (
  <figure>
    <Placeholder frothId={props.image}>
      <img
        src={
          makeFroth({
            src: props.image,
            size: "s"
          }).src
        }
        alt={props.title}
      />
    </Placeholder>
  </figure>
)

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
    const isUserDashboard = this.props.history.location.pathname.includes(
      ROUTE_URL_USER_LANDING
    )
    const isProfilePage =
      this.props.location.pathname.includes("/author/") || isUserDashboard

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
            <ArticleWrapper>
              <HeaderLarge
                style={{
                  zIndex: 11,
                  position: "relative"
                }}
                noTitleCase
                pageTitle={
                  (this.props.list.author && this.props.list.author.title) ||
                  TEXT_EMOJIS.HUG_RIGHT
                }
                pageSubtitle={
                  !this.props.list.author
                    ? "Loading…"
                    : this.props.list.author.subtitle
                }
              >
                <Byline>
                  {this.props.list.author &&
                    this.props.user.info.id === this.props.list.author.id && (
                      <React.Fragment>
                        {isUserDashboard ? (
                          <React.Fragment>
                            <span style={{ fontStyle: "normal" }}>✐ </span>
                            <Link to={`${ROUTE_URL_USER_LANDING}/edit`}>
                              Edit Profile
                            </Link>{" "}
                            <span style={{ fontStyle: "normal" }}>|</span>{" "}
                            <Link to={`/author/${this.props.user.info.id}`}>
                              My Public Profile
                            </Link>
                            <span style={{ fontStyle: "normal" }}> ☆</span>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            This is a preview of your public profile. You can
                            edit it along with seeing all your published and not
                            yet published submissions{" "}
                            <Link to={`${ROUTE_URL_USER_LANDING}`}>here</Link>.
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                </Byline>
              </HeaderLarge>

              {this.props.list.author && (
                <ArticleSection
                  style={{
                    zIndex: 11,
                    position: "relative"
                  }}
                >
                  <CardColumns>
                    {profileImage && (
                      <CardIntegratedForColumns>
                        {isUserDashboard ? (
                          <Link to={`${ROUTE_URL_USER_LANDING}/edit`}>
                            <ProfileImage
                              image={profileImage}
                              title={this.props.list.author.title}
                            />
                          </Link>
                        ) : (
                          <ProfileImage
                            image={profileImage}
                            title={this.props.list.author.title}
                          />
                        )}
                      </CardIntegratedForColumns>
                    )}
                    {(this.props.list.author.text || doesAuthorHaveLink) && (
                      <CardIntegratedForColumns>
                        {this.props.list.author.text && (
                          <figcaption style={{ fontSize: ".8em" }}>
                            <CardCaption>
                              {this.props.list.author.text}
                            </CardCaption>
                          </figcaption>
                        )}
                        {doesAuthorHaveLink && (
                          <CardButton
                            to={this.props.list.author.buttons[1].to}
                            branded
                          >
                            {this.props.list.author.buttons[1].text}
                          </CardButton>
                        )}
                      </CardIntegratedForColumns>
                    )}
                    {isUserDashboard &&
                      (!this.props.list.author.text || !doesAuthorHaveLink) && (
                        <CardIntegratedForColumns>
                          <figcaption style={{ fontSize: ".8em" }}>
                            <CardCaption>
                              {this.props.list.author.text || (
                                <span>
                                  <Link to={`${ROUTE_URL_USER_LANDING}/edit`}>
                                    Tell the world
                                  </Link>{" "}
                                  abot yourself.
                                </span>
                              )}
                            </CardCaption>
                          </figcaption>

                          <CardButton
                            to={
                              doesAuthorHaveLink
                                ? this.props.list.author.buttons[1].to
                                : `${ROUTE_URL_USER_LANDING}/edit`
                            }
                            branded
                          >
                            {doesAuthorHaveLink
                              ? this.props.list.author.buttons[1].text
                              : "Add a Link"}
                          </CardButton>
                        </CardIntegratedForColumns>
                      )}
                  </CardColumns>
                </ArticleSection>
              )}

              {this.props.user.connection.status !== "offline" &&
                this.props.list.page["items-total"] === 0 &&
                this.props.me && <PlaceholderHowToSubmit />}
            </ArticleWrapper>
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
        {/* <Offer embed /> */}
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
