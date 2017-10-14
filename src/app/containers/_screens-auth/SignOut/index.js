// tools
import React from "react"
import Helmet from "react-helmet"
import open from "oauth-open"

// redux
import { connect } from "react-redux"
import {
  verify as verifyUser,
  getInfo as getUserInfo
} from "../../../../actions/userActions"

// components
import SignInWithEmail from "../../_forms/SigninWithEmail"
import Heading from "../../../components/ArticleHeading"
import { Article, Section } from "../../../components/ArticleStyles"
import AlreadyAuthenticated from "../../_screens-errors/AlreadyAuthenticated"

// styles
import { ButtonGroup } from "../../../components/Button"
import {
  TwitterButton,
  FacebookButton
} from "../../../components/Button/components/SocialButtons"

// constants & helpers
import { ROUTE_LOGIN_TWITTER_API } from "../../../../constants/login"

// render
class SignIn extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleTwitterButton = this.handleTwitterButton.bind(this)
  }

  handleTwitterButton = () => {
    open(
      ROUTE_LOGIN_TWITTER_API,
      {
        name: "Sign in with Twitter",
        width: 500,
        height: 600
      },
      (err, code) => {
        if (err) console.error(err)
        localStorage.setItem("token", code.token)
        this.props.verifyUser()
        this.props.getUserInfo()
        this.props.history.replace({
          pathname: this.props.user.routes.success
        })
      }
    )
  }
  handleFacebookButton = () => {
    alert("Facebook login")
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
            <p style={{ textAlign: "center" }}>
              Sign in or create new account instantly. No passwords required!
            </p>
            <ButtonGroup>
              <TwitterButton onClick={this.handleTwitterButton}>
                Continue with Twitter
              </TwitterButton>

              <FacebookButton onClick={this.handleFacebookButton}>
                Continue with Facebook
              </FacebookButton>
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
const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
