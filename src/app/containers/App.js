// tools
import React from "react"
import ReactGA from "react-ga"
import { withRouter } from "react-router"

// redux
import { connect } from "react-redux"
import { setView as setNavView, setLocation as setNavLocation } from "../../actions/navActions"
import { getSession as getUserSession } from "../../actions/userActions"


import { Modal } from "./Modal"
import Nav from "./Nav"
import AppRoutes from "../components/views/AppRoutes"

// init GA tracking
ReactGA.initialize("UA-91374353-3", {
  debug: false,
  titleCase: true,
  gaOptions: {}
})
const trackView = () => {
	ReactGA.set({ page: window.location.pathname + window.location.search })
	ReactGA.pageview(window.location.pathname + window.location.search)
	window.scrollTo(0,0)
}


// render & route
class App extends React.PureComponent {

	// manipulate nav view & GA tracking
	componentDidMount(){
		this.handleRouteChnange()
		this.props.history.listen((location, action) => this.handleRouteChnange())
    this.props.getUserSession()
	}
	handleRouteChnange = () => {
		trackView()
		switch (this.props.history.location.pathname) {
			case "/submit/compose":
			case "/submit/compose/":
				this.props.setNavView("COMPOSER")
				this.props.setNavLocation({ "bottom": false })
				break
			case "/sign-in":
			case "/sign-in/":
				this.props.setNavView("VISITOR")
				this.props.setNavLocation({ "top": false })
				break
			default:
        if(this.props.history.location.state && this.props.history.location.state.status === "404"){
          this.props.setNavView("VISITOR")
  				this.props.setNavLocation({
            top: false,
            bottom: false,
          })
        }
        else{
          this.props.setNavView("VISITOR")
  				this.props.setNavLocation({})
        }
		}
	}

	render(){
		return (
      <div>
  			<Nav top />
  				<AppRoutes />
  			<Nav bottom />
        <Modal />
      </div>
		)
	}
}


// connet with redux
const mapDispatchToProps = dispatch => {
	return {
		setNavView: view => {
			dispatch(setNavView(view))
		},
		setNavLocation: location => {
			dispatch(setNavLocation(location))
		},
    getUserSession: () => {
      dispatch(getUserSession())
    }
	}
}
export default withRouter(connect(null, mapDispatchToProps)(App))
