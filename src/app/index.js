import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"
import queryString from "query-string"

import { withRouter } from "react-router"

import { CARD_ERRORS } from "./user/constants/messages-session"
import { DATA_GA_ID, HOST_RUNTIME, HOST_PROD } from "./constants"
import { Modal } from "./core/components/controls/Modal"
import { ROUTE_URL_USER_LANDING } from "./user/constants/routes-session"
import { setCard as setModalCard } from "./core/store/actions-modal"
import {
  setView as setNavView,
  setLocation as setNavLocation
} from "./core/store/actions-nav"
import {
  verify as verifyUser,
  getInfo as getUserInfo,
  setConnectionStatus,
  setIntent as setUserIntent
} from "./user/store/actions-user"
import AppRoutes from "./core/components/routes/App"
import Nav from "./core/components/controls/Nav_c"

// init GA tracking
if (process.env.NODE_ENV === "development" || HOST_RUNTIME !== HOST_PROD) {
  window["ga-disable-" + DATA_GA_ID] = true
} else {
  window["ga-disable-" + DATA_GA_ID] = false
}

// preload for List component
const ListPreloader = Loadable({
  loader: () => import("./core/components/pages/List"),
  loading: () => null
})
// preload for Article component
const ArticlePreloader = Loadable({
  loader: () => import("./core/components/pages/Article"),
  loading: () => null
})

class App extends React.PureComponent {
  // manipulate nav view & GA tracking
  componentDidMount = () => {
    // log in user with the token they received via email
    if (queryString.parse(this.props.location.search).token) {
      localStorage.setItem(
        "token",
        queryString.parse(this.props.location.search).token
      )
      // redirect user to their /me page as with all other login methods
      this.props.history.replace({
        pathname: this.props.user.routes.success
      })
    }

    // show message for expired tokens
    if (
      queryString.parse(this.props.location.search).error &&
      queryString.parse(this.props.location.search).error ===
        "INVALID_OR_EXPIRED"
    ) {
      this.props.setModalCard(
        {
          status: "ok",
          info: CARD_ERRORS.LOGIN_EMAIL_BAD_TOKEN
        },
        { url: "errors/email-login" }
      )
    }

    // verify user status
    this.props.verifyUser()
    this.props.getUserInfo()

    // listen to route changes:
    this.handleRouteChnange()
    // this.props.history.listen((location, action) => this.handleRouteChnange())
    this.props.history.listen(() => this.handleRouteChnange())

    // async load Google Analytics module
    import("react-ga").then(ReactGA => {
      ReactGA.initialize(DATA_GA_ID, {
        debug: false,
        titleCase: true,
        gaOptions: {},
        gaAddress: process.env.PUBLIC_URL + "/analytics-20181123452.js"
      })
      this.setView = () => {
        ReactGA.set({ page: window.location.pathname + window.location.search })
        ReactGA.pageview(window.location.pathname + window.location.search)
        window.scrollTo(0, 0)
      }
      this.setView()
    })

    // track connection (online/offline) status for user
    // listener
    const updateConnectionStatus = () => {
      this.props.setConnectionStatus(navigator.onLine ? "online" : "offline")
    }
    window.addEventListener("online", updateConnectionStatus)
    window.addEventListener("offline", updateConnectionStatus)
    // check on lanuch
    navigator.onLine === false && this.props.setConnectionStatus("offline")
  }
  componentWillReceiveProps = nextProps => {
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
    // Google Analytics (if available)
    this.setView && this.setView()

    // configure header/footer views depending on routes and HTTP status
    switch (this.props.history.location.pathname) {
      case "/submit/compose":
      case "/submit/compose/":
        this.props.setNavView("COMPOSER")
        this.props.setNavLocation({ bottom: false })
        break
      case ROUTE_URL_USER_LANDING + "/edit":
      case ROUTE_URL_USER_LANDING + "/edit/":
        this.props.setNavLocation({ top: false, bottom: false })
        break
      case "/submit/confirm-full-consent":
      case "/submit/confirm-full-consent/":
      case "/submit/confirm-basic-consent/":
      case "/submit/confirm-basic-consent":
        this.props.setNavLocation({
          top: false,
          bottom: false
        })
        break
      case "/sign-in":
      case "/sign-in/":
        this.props.setNavView("VISITOR")
        if (
          this.props.history.location.state &&
          this.props.history.location.state.status === "103" // already authenticated
        ) {
          this.props.setNavLocation({
            top: false,
            bottom: false
          })
        } else {
          this.props.setNavLocation({ top: false })
        }
        break
      default:
        if (
          this.props.history.location.state &&
          (this.props.history.location.state.status === "404" ||
            this.props.history.location.state.status === "403")
        ) {
          this.props.setNavView("VISITOR")
          this.props.setNavLocation({
            top: false,
            bottom: false
          })
        } else {
          this.props.setNavView("VISITOR")
          this.props.setNavLocation({})
        }
    }
  }

  render = () => {
    return [
      <Nav top key="App_Nav_top" />,
      <AppRoutes userStatus={this.props.user.status} key="App_AppRoutes" />,
      <Nav bottom key="App_Nav_bottom" />,
      <Modal key="App_Modal" />
    ]
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    setNavView: view => {
      dispatch(setNavView(view))
    },
    setNavLocation: location => {
      dispatch(setNavLocation(location))
    },
    verifyUser: () => {
      dispatch(verifyUser())
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
    setModalCard: (info, request) => {
      dispatch(setModalCard(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))