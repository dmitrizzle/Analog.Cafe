import { connect } from "react-redux"
import React from "react"
import open from "oauth-open"

import {
  FacebookLinkButton,
  TwitterLinkButton
} from "../../../../core/components/controls/Button/components/SocialButtons"
import {
  ROUTE_API_LOGIN_FACEBOOK,
  ROUTE_API_LOGIN_TWITTER
} from "../../../constants/routes-session"
import {
  verifyUser,
  getUserInfo,
  setSessionInfo,
  refreshSessionInfo
} from "../../../store/actions-user"
import AlreadyAuthenticated from "../Error/components/AlreadyAuthenticated"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import Modal from "../../../../core/components/controls/Modal"
import SignInInfo from "./components/SignInInfo"
import SignInWithEmail from "../../forms/SigninWithEmail"

const POPUP_WINDOW = name => {
  return {
    name,
    width: 580,
    height: 400
  }
}
const processSignin = (props, code, sessionInfo) => {
  localStorage.setItem("token", code.token)
  props.verifyUser()
  props.getUserInfo()
  props.history.replace({
    pathname: props.user.routes.success
  })
  props.setSessionInfo("Facebook")
}
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
      ROUTE_API_LOGIN_TWITTER,
      POPUP_WINDOW("Sign in with Twitter"),
      (err, code) => {
        if (err) {
          console.error(err)
          return
        }
        processSignin(this.props, code, "Twitter")
      }
    )
  }
  handleFacebookButton = event => {
    event.stopPropagation()
    event.preventDefault()
    open(
      ROUTE_API_LOGIN_FACEBOOK,
      POPUP_WINDOW("Sign in with Facebook"),
      (err, code) => {
        if (err) {
          console.error(err)
          return
        }
        processSignin(this.props, code, "Facebook")
      }
    )
  }

  render() {
    if (this.props.user.status !== "ok") {
      return (
        <ArticleWrapper>
          <MetaTags metaTitle="Sign In" />
          <HeaderLarge pageTitle="Sign In" pageSubtitle="Authors and Editors" />
          <ArticleSection>
            <SignInInfo stateSessionInfo={this.state.sessionInfo} />

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
                <em>
                  <small>
                    <strong>OR:</strong> type your email below and get a{" "}
                    <Modal
                      with={{
                        info: {
                          image: "image-froth_3525424_rJ1m0e15m",
                          title: "Sign In with Confirmation Link",
                          text: (
                            <span>
                              Sign in and create accounts{" "}
                              <strong>securely and without passwords</strong>{" "}
                              using confirmation links.
                              <br />
                              <br />
                              Enter your email address and we’ll email you a
                              link that expires in ten minutes. Click it –
                              you’re now signed in!
                            </span>
                          )
                        },
                        id: "hints/disposable-links"
                      }}
                    >
                      confirmation
                    </Modal>{" "}
                    link:
                  </small>
                </em>
              </p>
              <CardIntegrated>
                <SignInWithEmail />
              </CardIntegrated>
            </ButtonGroup>
            <p>
              Your account is created automatically whenever you click either of
              the buttons above. You do not need to remember passwords. If you
              already have an account, simply use the same method to sign in as
              you did the first time – we’ll open your existing account for you.
              All accounts are secure and adhere to our strict{" "}
              <Link to="/privacy-policy">privacy policy</Link>.
            </p>
          </ArticleSection>
        </ArticleWrapper>
      )
    } else {
      return <AlreadyAuthenticated />
    }
  }
}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
