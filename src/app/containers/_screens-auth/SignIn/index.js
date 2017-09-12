// tools
import React from "react"
import Helmet from "react-helmet"

// redux
import { connect } from "react-redux"

// components
import SignInWithEmail from "../../_forms/SigninWithEmail"
import Heading from "../../../components/ArticleHeading"
import { Article, Section } from "../../../components/ArticleStyles"
import AlreadyAuthenticated from "../../_screens-errors/AlreadyAuthenticated"

// styles
import { ButtonGroup } from "../../../components/Button"
import { TwitterButton } from "./styles"

// constants & helpers
import { rememberMe } from "./helpers"
import { ROUTE_LOGIN_TWITTER_API } from "../../../../constants/login"
import { WEBSOCKET_AUTH_TOKEN } from "../../../../constants/user"

// render
class SignIn extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleTwitterButton = this.handleTwitterButton.bind(this)
  }

  componentWillMount = () => {
    // listen for login confirmation & redirect when successful
    const socketAuth = new WebSocket(WEBSOCKET_AUTH_TOKEN)
    socketAuth.addEventListener("message", event => {
      rememberMe(event.data)
      this.props.history.replace({
        pathname: this.props.user.routes.success
      })
    })
  }

  handleTwitterButton = () => {
    window.open(ROUTE_LOGIN_TWITTER_API, "_blank", "height=600,width=500")
  }

  render() {
    if (this.props.user.status !== "ok") {
      return (
        <Article>
          <Helmet>
            <title>Sign In</title>
          </Helmet>

          <Heading pageTitle="Sign In" />
          <Section>
            <ButtonGroup>
              <TwitterButton onClick={this.handleTwitterButton}>
                Sign in With Twitter
              </TwitterButton>
              <p>
                <em>- or -</em>
              </p>
              <SignInWithEmail />
            </ButtonGroup>
          </Section>
        </Article>
      )
    } else {
      return <AlreadyAuthenticated />
    }
  }
}

// connet with redux
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SignIn)
