import { connect } from "react-redux"
import React from "react"

import {
  FacebookLinkButton,
  TwitterLinkButton
} from "../../../../core/components/controls/Button/components/SocialButtons"
import { GA } from "../../../../utils"
import {
  ROUTE_API_LOGIN_FACEBOOK,
  ROUTE_API_LOGIN_TWITTER
} from "../../../constants/routes-session"
import { SubscribeWrapper } from "../../../../core/components/pages/Subscribe"
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
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import SignInInfo, { Hint } from "./components/SignInInfo"
import SignInWithEmail from "../../forms/SigninWithEmail"

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleTwitterButton = this.handleTwitterButton.bind(this)
    this.handleFacebookButton = this.handleFacebookButton.bind(this)
    this.state = {
      showHint: false,
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
  handleTwitterButton = () => {
    // event.preventDefault();
    this.props.addSessionInfo({
      loginMethod: "Twitter",
      loginEmail: ""
    })
    GA.event({
      category: "User",
      action: "Sign In",
      label: "Twitter"
    })
    // window.setTimeout(() => (window.location = ROUTE_API_LOGIN_TWITTER), 100);
  }
  handleFacebookButton = () => {
    // event.preventDefault();
    this.props.addSessionInfo({
      loginMethod: "Facebook",
      loginEmail: ""
    })
    GA.event({
      category: "User",
      action: "Sign In",
      label: "Facebook"
    })
    // window.setTimeout(() => (window.location = ROUTE_API_LOGIN_FACEBOOK), 100);
  }

  render() {
    if (this.props.user.status !== "ok") {
      return (
        <SubscribeWrapper>
          <MetaTags metaTitle="Sign In" metaSubtitle="Or create free account" />
          <HeaderLarge
            id="account"
            pageTitle="Sign In"
            pageSubtitle="Or Create Free Account"
          />
          {/* <WallPaper bgRouletteCached={"image-froth_1469613_Skk4VZmZE"}> */}
          <ArticleSection>
            <ButtonGroup style={{ padding: "0.5em 0 0" }}>
              <TwitterLinkButton
                to={ROUTE_API_LOGIN_TWITTER}
                onClick={this.handleTwitterButton}
                target="_parent"
              >
                Continue with Twitter
              </TwitterLinkButton>

              <FacebookLinkButton
                to={ROUTE_API_LOGIN_FACEBOOK}
                onClick={this.handleFacebookButton}
                target="_parent"
              >
                Continue with Facebook
              </FacebookLinkButton>

              <CardIntegrated>
                <SignInWithEmail />
              </CardIntegrated>
            </ButtonGroup>
            <SignInInfo
              getHint={() => {
                this.setState({ showHint: true })
              }}
            />
          </ArticleSection>
          {/* </WallPaper> */}
          <ArticleSection>
            <Hint
              stateSessionInfo={this.state.sessionInfo}
              getHint={() => {
                this.setState({ showHint: !this.state.showHint })
              }}
              showHint={this.state.showHint}
            />
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
