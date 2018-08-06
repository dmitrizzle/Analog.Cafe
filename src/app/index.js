import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"
import queryString from "query-string"

import { withRouter } from "react-router"

import { CARD_ERRORS } from "./user/constants/messages-session"
import { DATA_GA_ID, HOST_RUNTIME, HOST_PROD } from "./constants"
import { ROUTE_URL_USER_LANDING } from "./user/constants/routes-session"
import { setModal } from "./core/store/actions-modal"
import { setNavView, setNavPositions } from "./core/store/actions-nav"
import {
  verifyUser,
  getUserInfo,
  setConnectionStatus,
  setUserIntent
} from "./user/store/actions-user"
import AppRoutes from "./core/components/routes/App"
import ModalOverlay from "./core/components/controls/Modal/components/ModalOverlay"
import Nav from "./core/components/controls/Nav"

// if (process.env.NODE_ENV === "development" || HOST_RUNTIME !== HOST_PROD) {
//   window["ga-disable-" + DATA_GA_ID] = true
// } else {
//   window["ga-disable-" + DATA_GA_ID] = false
// }

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
        import("react-ga").then(ReactGA => {
          ReactGA.initialize(DATA_GA_ID, {
            debug:
              process.env.NODE_ENV === "development" ||
              HOST_RUNTIME !== HOST_PROD,
            titleCase: true,
            gaOptions: {},
            gaAddress: process.env.PUBLIC_URL + "/analytics-201808051558.js"
          })
          this.setView = () => {
            ReactGA.pageview(window.location.pathname + window.location.search)
            window.scrollTo(0, 0)
          }
          this.setView()
        })
        clearTimeout(analyticsScriptDeferrer)
      }.bind(this),
      1000
    )

    const updateConnectionStatus = () => {
      this.props.setConnectionStatus(navigator.onLine ? "online" : "offline")
    }
    window.addEventListener("online", updateConnectionStatus)
    window.addEventListener("offline", updateConnectionStatus)
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
    this.setView && this.setView()
    switch (this.props.history.location.pathname) {
      case "/submit/compose":
      case "/submit/compose/":
        this.props.setNavView("COMPOSER")
        this.props.setNavPositions({ bottom: false })
        break
      case ROUTE_URL_USER_LANDING + "/edit":
      case ROUTE_URL_USER_LANDING + "/edit/":
        this.props.setNavPositions({ top: false, bottom: false })
        break
      case "/submit/confirm-full-consent":
      case "/submit/confirm-full-consent/":
      case "/submit/confirm-basic-consent/":
      case "/submit/confirm-basic-consent":
        this.props.setNavPositions({
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
          this.props.setNavPositions({
            top: false,
            bottom: false
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
            top: false,
            bottom: false
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
      <AppRoutes userStatus={this.props.user.status} key="App_AppRoutes" />,
      <Nav bottom key="App_Nav_bottom" />,
      <ModalOverlay key="App_Modal" />
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
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
