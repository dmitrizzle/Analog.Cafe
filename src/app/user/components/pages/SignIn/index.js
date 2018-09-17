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
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import SignInInfo from "./components/SignInInfo"
import SignInWithEmail from "../../forms/SigninWithEmail"

const POPUP_WINDOW = name => {
  return {
    name,
    width: 500,
    height: 600
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
          <HeaderLarge pageTitle="Sign In" />
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
                <em>- or -</em>
              </p>
              <CardIntegrated>
                <SignInWithEmail />
              </CardIntegrated>
            </ButtonGroup>
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
