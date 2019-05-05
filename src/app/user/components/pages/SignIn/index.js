import { connect } from "react-redux"
import React from "react"
import open from "oauth-open"

import {
  FacebookLinkButton,
  TwitterLinkButton
} from "../../../../core/components/controls/Button/components/SocialButtons"
import { GA } from "../../../../utils"
import {
  ROUTE_API_LOGIN_FACEBOOK,
  ROUTE_API_LOGIN_TWITTER
} from "../../../constants/routes-session"
import {
  SubscribeWrapper,
  WallPaper
} from "../../../../core/components/pages/Subscribe"
import { redirectAfterSignIn } from "../../../utils/actions-session"
import {
  verifyUser,
  getUserInfo,
  addSessionInfo,
  getSessionInfo
} from "../../../store/actions-user"
import AlreadyAuthenticated from "../Error/components/AlreadyAuthenticated"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ButtonGroup from "../../../../core/components/controls/Button/components/ButtonGroup"
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated"
import Figure from "../../../../core/components/vignettes/Picture/components/Figure"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import SignInInfo, { Hint } from "./components/SignInInfo"
import SignInWithEmail from "../../forms/SigninWithEmail"

const POPUP_WINDOW = name => {
  return {
    name,
    width: 600,
    height: 720
  }
}
const processSignin = (props, code, sessionInfo) => {
  localStorage.setItem("token", code.token)
  props.verifyUser()
  props.getUserInfo()

  // redirect on sign in
  redirectAfterSignIn(props)

  props.addSessionInfo(sessionInfo)
}
class SignIn extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleTwitterButton = this.handleTwitterButton.bind(this)
    this.handleFacebookButton = this.handleFacebookButton.bind(this)
    this.state = {
      sessionInfo: {
        loginMethod: this.props.user.sessionInfo.loginMethod,
        loginEmail: this.props.user.sessionInfo.loginEmail,
        hasLoggedIn: this.props.user.sessionInfo.hasLoggedIn
      }
    }
  }
  componentDidMount = () => {
    this.props.getSessionInfo()
  }
  componentWillReceiveProps = nextProps => {
    this.setState({
      sessionInfo: {
        loginMethod: nextProps.user.sessionInfo.loginMethod,
        loginEmail: nextProps.user.sessionInfo.loginEmail,
        hasLoggedIn: nextProps.user.sessionInfo.hasLoggedIn
      }
    })
  }
  handleTwitterButton = event => {
    event.stopPropagation()
    event.preventDefault()
    GA.event({
      category: "User",
      action: "Sign In",
      label: "Twitter"
    })
    open(
      ROUTE_API_LOGIN_TWITTER,
      POPUP_WINDOW("Sign in with Twitter"),
      (err, code) => {
        if (err) {
          console.error(err)
          return
        }
        processSignin(this.props, code, { loginMethod: "Twitter" })
      }
    )
  }
  handleFacebookButton = event => {
    event.stopPropagation()
    event.preventDefault()
    GA.event({
      category: "User",
      action: "Sign In",
      label: "Facebook"
    })
    open(
      ROUTE_API_LOGIN_FACEBOOK,
      POPUP_WINDOW("Sign in with Facebook"),
      (err, code) => {
        if (err) {
          console.error(err)
          return
        }
        processSignin(this.props, code, { loginMethod: "Facebook" })
      }
    )
  }

  render() {
    if (this.props.user.status !== "ok") {
      return (
        <SubscribeWrapper>
          <MetaTags metaTitle="Sign In" metaSubtitle="Or create free account" />
          <HeaderLarge id="account" pageTitle="Sign In" />
          <WallPaper bgRouletteCached={"image-froth_1469613_Skk4VZmZE"}>
            <ArticleSection>
              <SignInInfo />
              <ButtonGroup style={{ padding: "0.5em 0 4em" }}>
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

                <CardIntegrated>
                  <SignInWithEmail />
                </CardIntegrated>
              </ButtonGroup>
            </ArticleSection>
          </WallPaper>
          <ArticleSection>
            <Hint stateSessionInfo={this.state.sessionInfo} />
            <p>
              Your account is created automatically whenever you click either of
              the buttons above. You do not need to remember passwords. If you
              already have an account, simply use the same method to sign in as
              you did the first time – we’ll take you to your existing account.
              All accounts are secure and adhere to our strict{" "}
              <Link to="/privacy-policy">privacy policy</Link>.
            </p>
            <h3 id="analogue-reads">“Analogue Reads” Tuesdays.</h3>
            <p>
              <strong>A weekly email newsletter</strong> featuring a digest of
              new photo essays, reviews, and guides. Every Tuesday at 9AM EST.{" "}
              <Link to="/privacy">No spam</Link>. Free with every account.
              Unsubscribe anytime.
            </p>
            <Link
              to="#account"
              onClick={event => {
                event.preventDefault()
                window.scroll({
                  top: 0,
                  behavior: "smooth"
                })
              }}
            >
              <Figure src="image-froth_1600000_BJRvHFlv4" feature />
            </Link>
          </ArticleSection>
        </SubscribeWrapper>
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
    addSessionInfo: sessionInfo => {
      dispatch(addSessionInfo(sessionInfo))
    },
    getSessionInfo: () => {
      dispatch(getSessionInfo())
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
