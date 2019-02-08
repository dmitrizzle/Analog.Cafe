import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"
import queryString from "query-string"
import throttle from "lodash/throttle"

import { withRouter } from "react-router"

import { CARD_ERRORS } from "./user/constants/messages-session"
import { GA } from "./utils"
import { ROUTE_URL_USER_LANDING } from "./user/constants/routes-session"
import {
  getUserInfo,
  refreshUser,
  setConnectionStatus,
  setUserIntent,
  verifyUser
} from "./user/store/actions-user"
import { setArticleSelectoin } from "./core/store/actions-article"
import { setModal } from "./core/store/actions-modal"
import { setNavView, setNavPositions } from "./core/store/actions-nav"
import AppRoutes from "./core/components/routes/App"
import HighlightMenu from "./core/components/controls/ArticleActions/components/HighlightMenu"
import ModalOverlay from "./core/components/controls/Modal/components/ModalOverlay"
import Nav from "./core/components/controls/Nav"

const ListPreloader = Loadable({
  loader: () => import("./core/components/pages/List"),
  loading: () => null
})
const ArticlePreloader = Loadable({
  loader: () => import("./core/components/pages/Article"),
  loading: () => null
})

class App extends React.PureComponent {
  componentDidMount = () => {
    if (queryString.parse(this.props.location.search).token) {
      localStorage.setItem(
        "token",
        queryString.parse(this.props.location.search).token
      )
      this.props.history.replace({
        pathname: this.props.user.routes.success
      })
    }
    if (
      queryString.parse(this.props.location.search).error &&
      queryString.parse(this.props.location.search).error ===
        "INVALID_OR_EXPIRED"
    ) {
      this.props.setModal(
        {
          status: "ok",
          info: CARD_ERRORS.LOGIN_EMAIL_BAD_TOKEN
        },
        { url: "errors/email-login" }
      )
    }
    this.props.verifyUser()
    this.props.getUserInfo()
    this.handleRouteChnange()
    this.props.history.listen(() => this.handleRouteChnange())

    const analyticsScriptDeferrer = setTimeout(
      function() {
        GA.initialize()
        this.setView = () => {
          this.props.setArticleSelectoin({ hidden: true })
          window.scrollTo(0, 0)
          GA.pageview()
        }
        this.setView()
        clearTimeout(analyticsScriptDeferrer)
      }.bind(this),
      1000
    )

    if (localStorage.getItem("fullstory-enabled") !== "false") {
      import("./utils/fullstory").then(FullStory => {
        FullStory.default()
      })
    }

    const updateConnectionStatus = () => {
      this.props.setConnectionStatus(navigator.onLine ? "online" : "offline")
    }
    window.addEventListener("online", updateConnectionStatus)
    window.addEventListener("offline", updateConnectionStatus)
    navigator.onLine === false && this.props.setConnectionStatus("offline")
  }
  keepUserAlive = throttle(this.props.refreshUser, 1000 * 60 * 5)
  componentWillReceiveProps = nextProps => {
    this.keepUserAlive()

    switch (nextProps.user.intent.load) {
      case "Article":
        ArticlePreloader.preload()
        break
      case "List":
        ListPreloader.preload()
        break
      default:
        return false
    }
  }
  handleRouteChnange = () => {
    this.setView && this.setView()
    switch (this.props.history.location.pathname) {
      case "/submit/compose":
      case "/submit/compose/":
        this.props.setNavView("COMPOSER")
        this.props.setNavPositions({})
        break
      case ROUTE_URL_USER_LANDING + "/edit":
      case ROUTE_URL_USER_LANDING + "/edit/":
        this.props.setNavPositions({ top: false })
        break
      case "/submit/confirm-full-consent":
      case "/submit/confirm-full-consent/":
      case "/submit/confirm-basic-consent/":
      case "/submit/confirm-basic-consent":
        this.props.setNavPositions({
          top: false
        })
        break
      case "/sign-in":
      case "/sign-in/":
        this.props.setNavView("VISITOR")
        if (
          this.props.history.location.state &&
          this.props.history.location.state.status === "103" // already authenticated
        ) {
          this.props.setNavPositions({
            top: false
          })
        } else {
          this.props.setNavPositions({ top: false })
        }
        break
      default:
        if (
          this.props.history.location.state &&
          (this.props.history.location.state.status === "404" ||
            this.props.history.location.state.status === "403")
        ) {
          this.props.setNavView("VISITOR")
          this.props.setNavPositions({
            top: false
          })
        } else {
          this.props.setNavView("VISITOR")
          this.props.setNavPositions({})
        }
    }
  }

  render = () => {
    return [
      <Nav top key="App_Nav_top" />,
      // <Subscribe
      //   key="App_Essays"
      //   hidden={
      //     this.props.nav.view !== "VISITOR" || !this.props.nav.location.top
      //   }
      //   onClick={() => {
      //     GA.event({
      //       category: "Navigation",
      //       action: "Nav.click",
      //       label: "Subscribe.desktop"
      //     })
      //   }}
      // >
      //   <Link to="/subscribe">
      //     Subscribe <span style={{ fontStyle: "normal" }}>❤︎</span>
      //   </Link>
      // </Subscribe>,
      <AppRoutes userStatus={this.props.user.status} key="App_AppRoutes" />,
      <Nav bottom key="App_Nav_bottom" />,
      <ModalOverlay key="App_Modal" />,
      <HighlightMenu
        key="App_HighlightMenu"
        selection={this.props.article.selection}
      />
    ]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setNavView: view => {
      dispatch(setNavView(view))
    },
    setNavPositions: location => {
      dispatch(setNavPositions(location))
    },
    verifyUser: () => {
      dispatch(verifyUser())
    },
    refreshUser: () => {
      dispatch(refreshUser())
    },
    getUserInfo: () => {
      dispatch(getUserInfo())
    },
    setUserIntent: intent => {
      dispatch(setUserIntent(intent))
    },
    setConnectionStatus: connection => {
      dispatch(setConnectionStatus(connection))
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    },
    setArticleSelectoin: selection => {
      dispatch(setArticleSelectoin(selection))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    article: state.article,
    nav: state.nav
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
