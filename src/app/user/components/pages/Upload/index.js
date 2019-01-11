// import "localforage-getitems"

import { connect } from "react-redux"
import {
  loadTextContent,
  loadContent
} from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"

import { CARD_ERRORS } from "../../../constants/messages-submission"
import { ROUTE_URL_USER_LANDING } from "../../../constants/routes-session"
import { TEXT_EMOJIS } from "../../../../constants"
import { loadHeader, sendSubmission } from "../../../utils/actions-submission"
import { redirectToSignIn } from "../../../utils/actions-session"
import { resetStatus } from "../../../../admin/store/actions-editor"
import { setModal } from "../../../../core/store/actions-modal"
import { setUserRoutes, resetUserRoutes } from "../../../store/actions-user"
import {
  uploadSubmission,
  resetUploadProgress
} from "../../../store/actions-submission"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import HeaderSubtitle from "../../../../core/components/vignettes/HeaderLarge/components/HeaderSubtitle"
import HeaderTitle from "../../../../core/components/vignettes/HeaderLarge/components/HeaderTitle"
import HeaderWrapper from "../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper"
import Link from "../../../../core/components/controls/Link"
import LinkButton from "../../../../core/components/controls/Button/components/LinkButton"
import MetaTags from "../../../../core/components/vignettes/MetaTags"

const STATUS_MESSAGES = {
  pending: "Sending…",
  complete: "Done!",
  error: "Error"
}
class Upload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      status: "pending"
    }
  }
  componentDidMount = () => {
    if (
      !localStorage.getItem("composer-header-state") ||
      JSON.parse(localStorage.getItem("composer-header-state")).title === ""
    ) {
      this.handleEmptySubmission()
      return
    }
    if (
      !localStorage.getItem("composer-content-text") ||
      localStorage.getItem("composer-content-text") === ""
    ) {
      this.handleEmptySubmission()
      return
    }
    if (!localStorage.getItem("token")) {
      redirectToSignIn(this.props)
    } else {
      this.props.resetUserRoutes()
      const submissionConsent = this.props.history.location.pathname.includes(
        "full-consent"
      )
      const content = loadContent()
      const header = loadHeader()
      const textContent = loadTextContent()
      if (!(content && content.document && content.document.nodes)) {
        return this.handleEmptySubmission()
      }
      let data = new FormData()
      data.append("content", JSON.stringify(content))
      data.append("header", JSON.stringify(header))
      data.append("textContent", textContent)
      data.append("isFullConsent", submissionConsent)
      const keys = content.document.nodes
        .filter(node => !!(node.data && node.data.key))
        .map(node => node.data.key)
      const srcs = content.document.nodes
        .filter(node => !!(node.data && node.data.src))
        .map(node => node.data.src)
      if (keys.length > 0) {
        // localForage.getItems(keys).then(results => {
        //   keys.forEach(k => {
        //     data.append("images[" + k + "]", base64ToBlob(results[k]))
        //   })
        //   content.document.nodes
        //     .filter(node => !!(node.data && node.data.src))
        //     .forEach(node => (node.data.src = null))
        //   sendSubmission(data, this.props)
        // })
      } else {
        if (srcs.length === 0) {
          this.props.setModal(
            {
              status: "ok",
              info: CARD_ERRORS.SEND_IMAGES_MISSING
            },
            { url: "errors/submissions" }
          )
          this.props.history.replace({ pathname: "/submit/compose" })
        } else {
          sendSubmission(data, this.props)
        }
      }
    }
  }
  componentWillReceiveProps = nextProps => {
    if (
      nextProps.submission.uploadProgress ===
      this.props.submission.uploadProgress
    )
      return
    if (nextProps.submission.uploadProgress >= 0)
      this.setState({
        progress:
          nextProps.submission.uploadProgress > 0
            ? nextProps.submission.uploadProgress
            : this.state.progress
      })
    else
      this.setState({
        status: "error"
      })
    if (
      this.props.submission.uploadProgress >= 0 &&
      nextProps.submission.uploadProgress === 100
    ) {
      this.props.resetUploadProgress()
      this.props.resetStatus()
      this.setState({
        status: "complete"
      })
    }
  }
  handleEmptySubmission = () => {
    this.props.setModal(
      {
        status: "ok",
        info: CARD_ERRORS.SEND_CONTENT_EMPTY
      },
      { url: "errors/submissions" }
    )
    this.props.history.replace({
      pathname: "/submit/compose"
    })
  }
  render = () => {
    return (
      <ArticleWrapper>
        <MetaTags metaTitle="Sending…" />
        <HeaderWrapper>
          <HeaderTitle>{this.state.progress}%</HeaderTitle>
          <HeaderSubtitle>{STATUS_MESSAGES[this.state.status]}</HeaderSubtitle>
        </HeaderWrapper>
        <ArticleSection>
          {/* <p>
            You have marked your submission as
            <em>
              {this.props.history.location.pathname.includes("full-consent") ===
              true
                ? " open for collaborations. "
                : " closed to collaborations. "}
            </em>
          </p> */}
          {this.state.status === "pending" && (
            <p>
              <strong>
                <span role="img" aria-label="Warning">
                  {TEXT_EMOJIS.WARNING}
                </span>{" "}
                Please keep this page open, do not refresh and do not click your
                browser’s “back” button
              </strong>{" "}
              while your submission is sending (uploading).
            </p>
          )}
          {this.state.status === "error" && (
            <p>
              <strong>{CARD_ERRORS.SEND.text}</strong>{" "}
              <a
                href="#reload"
                onClick={event => {
                  event.preventDefault()
                  window.location.reload()
                }}
              >
                Try again
              </a>{" "}
              or <Link to={"/submit/compose"}>go back</Link>.
            </p>
          )}
          {this.state.status === "complete" && (
            <div>
              <MetaTags metaTitle="Done!" />
              <p>
                We’ve received your work. It’ll take a couple of minutes to
                process the images – after that, you should be able to see it{" "}
                <Link to={ROUTE_URL_USER_LANDING}>here</Link>.
              </p>
              <p>Thank you so much for your contribution!</p>
              <LinkButton branded to={ROUTE_URL_USER_LANDING}>
                My Submissions
              </LinkButton>
            </div>
          )}
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}
const mapStateToProps = state => {
  return {
    composer: state.composer,
    submission: state.submission,
    editor: state.editor,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    uploadSubmission: request => {
      dispatch(uploadSubmission(request))
    },
    resetUploadProgress: () => {
      dispatch(resetUploadProgress())
    },
    resetStatus: () => {
      dispatch(resetStatus())
    },
    setUserRoutes: routes => {
      dispatch(setUserRoutes(routes))
    },
    resetUserRoutes: () => {
      dispatch(resetUserRoutes())
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload)
