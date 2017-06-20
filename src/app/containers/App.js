// tools
import React from "react"
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import Helmet from "react-helmet"
import ReactGA from "react-ga"

// theme
import Paper from "../themes/Paper"


// views and components
import { About, NotFound, Login, Publication } from "../components/Views"
import { Intro, Submit } from "../components/Views/Submit"
import Composer from "./Composer"
import List from "./List"
import Post from "./Post"


// init GA tracking
ReactGA.initialize("UA-91374353-3")

// render & route
export default props => {
	const updateView = () => {
		ReactGA.set({ page: window.location.pathname + window.location.search })
		ReactGA.pageview(window.location.pathname + window.location.search)

		window.scrollTo(0,0)
	}
	return (
		<Paper>
			<Helmet
				defaultTitle="Analog.Cafe ☕️"
				titleTemplate="%s ☕️ Analog.Cafe"
			/>

			<Router history={ browserHistory } onUpdate={ updateView } >

				<Route path="/"			 					component={ Publication } >
					<IndexRoute 								component={ List } />
					<Route path="photo-essays"	component={ List } />
					<Route path="articles"			component={ List } />
					<Route path="about"			 		component={ About } />

					<Route path="zine/*"				component={ Post } />
					<Route path="author/*"			component={ List } />
				</Route>

				<Route path="submit"					component={ Submit } >
					<IndexRoute 								component={ Intro } />
					<Route path="compose" 			component={ Composer } />
				</Route>

				<Route path="login"						component={ Login } />
				<Route path="*"								component={ NotFound } status={404} />

			</Router>

		</Paper>
	)
}
