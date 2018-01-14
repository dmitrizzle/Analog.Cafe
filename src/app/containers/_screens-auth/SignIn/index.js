// tools
import React from "react"
import Helmet from "../../../components/_async/Helmet"
import open from "oauth-open"

// redux
import { connect } from "react-redux"
import {
  verify as verifyUser,
  getInfo as getUserInfo,
  setSessionInfo,
  refreshSessionInfo
} from "../../../../actions/userActions"

// components
import SignInWithEmail from "../../_forms/SigninWithEmail"
import Heading from "../../../components/ArticleHeading"
import { Article, Section } from "../../../components/ArticleStyles"
import AlreadyAuthenticated from "../../_screens-errors/AlreadyAuthenticated"

// styles
import { ButtonGroup } from "../../../components/Button/components/ButtonGroup"
import {
  TwitterLinkButton,
  FacebookLinkButton
} from "../../../components/Button/components/SocialButtons"

// constants & helpers
import {
  ROUTE_LOGIN_TWITTER_API,
  ROUTE_LOGIN_FACEBOOK_API
} from "../../../../constants/login"

// render
class SignIn extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleTwitterButton = this.handleTwitterButton.bind(this)
    this.handleFacebookButton = this.handleFacebookButton.bind(this)
    this.state = {
      sessionInfo: {
        method: this.props.user.sessionInfo.method,
        id: this.props.user.sessionInfo.id,
        login: this.props.user.sessionInfo.login
      }
    }
  }

  componentDidMount = () => {
    this.props.refreshSessionInfo()
  }
  componentWillReceiveProps = nextProps => {
    this.setState({
      sessionInfo: {
        method: nextProps.user.sessionInfo.method,
        id: nextProps.user.sessionInfo.id,
        login: nextProps.user.sessionInfo.login
      }
    })
  }

  handleTwitterButton = event => {
    event.stopPropagation()
    event.preventDefault()
    open(
      ROUTE_LOGIN_TWITTER_API,
      {
        name: "Sign in with Twitter",
        width: 500,
        height: 600
      },
      (err, code) => {
        if (err) {
          console.error(err)
          return
        }
        localStorage.setItem("token", code.token)
        this.props.verifyUser()
        this.props.getUserInfo()
        this.props.history.replace({
          pathname: this.props.user.routes.success
        })
        this.props.setSessionInfo("Twtitter")
      }
    )
  }
  handleFacebookButton = event => {
    event.stopPropagation()
    event.preventDefault()
    open(
      ROUTE_LOGIN_FACEBOOK_API,
      {
        name: "Sign in with Facebook",
        width: 500,
        height: 600
      },
      (err, code) => {
        if (err) {
          console.error(err)
          return
        }
        localStorage.setItem("token", code.token)
        this.props.verifyUser()
        this.props.getUserInfo()
        this.props.history.replace({
          pathname: this.props.user.routes.success
        })
        this.props.setSessionInfo("Facebook")
      }
    )
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
            <p style={{ textAlign: "center", marginBottom: "0" }}>
              Sign in or create new account instantly, without passwords.
              <br />
              <small>
                {this.state.sessionInfo.login &&
                this.state.sessionInfo.method ? (
                  <em>
                    Hint: last time you used {this.state.sessionInfo.id}{" "}
                    {this.state.sessionInfo.method}.
                  </em>
                ) : (
                  <span>&nbsp;</span>
                )}
              </small>
            </p>

            <ButtonGroup>
              <TwitterLinkButton
                to="#twitter-sign-in"
                onClick={this.handleTwitterButton}
              >
                Continue with Twitter
              </TwitterLinkButton>

              <FacebookLinkButton
                to="#facebook-sign-in"
                onClick={this.handleFacebookButton}
              >
                Continue with Facebook
              </FacebookLinkButton>
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

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    verifyUser: () => {
      dispatch(verifyUser())
    },
    getUserInfo: () => {
      dispatch(getUserInfo())
    },
    setSessionInfo: (method, id) => {
      dispatch(setSessionInfo(method, id))
    },
    refreshSessionInfo: () => {
      dispatch(refreshSessionInfo())
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
