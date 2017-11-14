// tools
import React from "react"
import { withRouter } from "react-router"

// constants & helpers
import {
  APP_TRACKING_GAID,
  ROUTE_APP_CURRENT_DOMAIN,
  ROUTE_APP_PRODUCTION_DOMAIN_NAME
} from "../../../constants/app"
import { ROUTE_AUTH_USER_LANDING } from "../../../constants/user"

// redux
import { connect } from "react-redux"
import {
  setView as setNavView,
  setLocation as setNavLocation
} from "../../../actions/navActions"
import {
  verify as verifyUser,
  getInfo as getUserInfo
} from "../../../actions/userActions"

import { Modal } from "../Modal"
import Nav from "../Nav"
import AppRoutes from "../../components/_screens/AppRoutes"

// init GA tracking
if (
  process.env.NODE_ENV === "development" ||
  ROUTE_APP_CURRENT_DOMAIN !== ROUTE_APP_PRODUCTION_DOMAIN_NAME
) {
  window["ga-disable-" + APP_TRACKING_GAID] = true
} else {
  window["ga-disable-" + APP_TRACKING_GAID] = false
}

// render & route
class App extends React.PureComponent {
  // manipulate nav view & GA tracking
  componentDidMount = () => {
    // verify user status
    this.props.verifyUser()
    this.props.getUserInfo()

    // listen to route changes:
    this.handleRouteChnange()
    this.props.history.listen((location, action) => this.handleRouteChnange())

    // async load Google Analytics module
    import("react-ga").then(ReactGA => {
      ReactGA.initialize(APP_TRACKING_GAID, {
        debug: true,
        titleCase: true,
        gaOptions: {}
      })
      this.setView = () => {
        ReactGA.set({ page: window.location.pathname + window.location.search })
        ReactGA.pageview(window.location.pathname + window.location.search)
        window.scrollTo(0, 0)
      }
      this.setView()
    })
  }
  handleRouteChnange = () => {
    // Google Analytics (if available)
    this.setView && this.setView()

    // configure header/footer views depending on routes and HTTP status
    switch (this.props.history.location.pathname) {
      case "/submit/compose":
      case "/submit/compose/":
      case "/beta/compose":
      case "/beta/compose/":
        this.props.setNavView("COMPOSER")
        this.props.setNavLocation({ bottom: false })
        break
      case ROUTE_AUTH_USER_LANDING + "/edit":
      case ROUTE_AUTH_USER_LANDING + "/edit/":
        this.props.setNavLocation({ top: false, bottom: false })
        break
      case "/submit/confirm-full-consent":
      case "/submit/confirm-full-consent/":
      case "/submit/confirm-basic-consent/":
      case "/submit/confirm-basic-consent":
      case "/beta/confirm-full-consent":
      case "/beta/confirm-full-consent/":
      case "/beta/confirm-basic-consent/":
      case "/beta/confirm-basic-consent":
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
    return (
      <div>
        <Nav top />
        <AppRoutes userStatus={this.props.user.status} />
        <Nav bottom />
        <Modal />
      </div>
    )
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
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
