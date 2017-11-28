// tools
import React from "react"
import Helmet from "../../../components/_async/Helmet"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../actions/modalActions"

import localForage from "localforage"
import "localforage-getitems"

// components
import Heading from "../../../components/ArticleHeading"
import { Article, Section } from "../../../components/ArticleStyles"

// constants & helpers
import { loadContent, loadHeader } from "../../../../utils/composer-loader"
import { ROUTE_REDIRECT_AFTER_SUBMIT } from "../../../../constants/submission"
import emojis from "../../../../constants/messages/emojis"
import errorMessages from "../../../../constants/messages/errors"

import {
  redirectToSignIn,
  sendSubmission
} from "../../../../utils/upload-utils"

// redux actions
import {
  setRoutes as setLoginRedirectRoutes,
  resetRoutes as resetLoginRedirectRoutes
} from "../../../../actions/userActions"
import {
  send as sendUpload,
  initStatus as resetUploadStatus,
  getSubmissionProgress
} from "../../../../actions/uploadActions"

// render
class Upload extends React.PureComponent {
  componentDidMount = () => {
    // no title present
    if (
      !localStorage.getItem("composer-header-state") ||
      JSON.parse(localStorage.getItem("composer-header-state")).title === ""
    ) {
      this.handleEmptySubmission()
      return
    }
    // no body text present
    if (
      !localStorage.getItem("composer-content-text") ||
      localStorage.getItem("composer-content-text") === ""
    ) {
      this.handleEmptySubmission()
      return
    }

    if (!localStorage.getItem("token")) {
      // redirects
      redirectToSignIn(this.props)
    } else {
      this.props.resetLoginRedirectRoutes()

      // construct submission data
      const submissionConsent = this.props.history.location.pathname.includes(
        "full-consent"
      )
      const content = loadContent()
      const header = loadHeader()
      if (!(content && content.document && content.document.nodes)) {
        return this.handleEmptySubmission()
      }

      // form data obj
      let data = new FormData()
      data.append("content", JSON.stringify(content))
      data.append("header", JSON.stringify(header))
      data.append("isFullConsent", submissionConsent)

      // get filename keys for the saved images in the submission
      const keys = content.document.nodes
        .filter(node => !!(node.data && node.data.key))
        .map(node => node.data.key)
      const srcs = content.document.nodes
        .filter(node => !!(node.data && node.data.src))
        .map(node => node.data.src)

      // images added from user's device
      if (keys.length > 0) {
        localForage.getItems(keys).then(results => {
          keys.forEach(k => {
            data.append("images[" + k + "]", results[k])
          })
          sendSubmission(data, this.props)
        })
      } else {
        // images added as URLs or no images
        if (srcs.length === 0) {
          this.props.setCard(
            {
              status: "ok",
              info: errorMessages.VIEW_TEMPLATE.SUBMISSION_NO_IMAGES
            },
            { url: "errors/submissions" }
          )
          this.props.history.replace({ pathname: "/submit/compose" })
        } else sendSubmission(data, this.props)
      }
    }
  }
  handleEmptySubmission = () => {
    this.props.setCard(
      {
        status: "ok",
        info: errorMessages.VIEW_TEMPLATE.SUBMISSION_NO_CONTENT
      },
      { url: "errors/submissions" }
    )
    this.props.history.replace({
      pathname: "/submit/compose"
    })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.upload.status === "ok") {
      if (nextProps.upload.progressReq !== "loading") {
        nextProps.getSubmissionProgress(nextProps.upload.data.id)
      }
      if (Number(nextProps.upload.progress) === 100) {
        // clear submissions content and image in storage
        localStorage.removeItem("composer-content-state")
        localStorage.removeItem("composer-header-state")
        localForage.clear()
        // reset upload state
        nextProps.resetUploadStatus()
        // redirect after submission complete
        nextProps.history.replace({ pathname: ROUTE_REDIRECT_AFTER_SUBMIT })
      }
    } else if (nextProps.upload.status === "unauthorized") {
      // if user is unauthorized, redirect to sign in page
      redirectToSignIn(nextProps)
    } else if (nextProps.upload.status !== "pending") {
      // submission not in progress
    }
  }

  render = () => {
    const progress =
      this.props.upload && this.props.upload.progress
        ? ` ${this.props.upload.progress}%`
        : ""
    return (
      <Article>
        <Helmet>
          <title>Uploading Submission…{progress}</title>
        </Helmet>
        <Heading
          pageTitle={emojis.NEONCAT}
          pageSubtitle={`Sending…${progress}`}
        />
        <Section>
          <p>
            You have requested
            <em>
              {this.props.history.location.pathname.includes("full-consent") ===
              true
                ? " more exposure. "
                : " no additional exposure. "}
            </em>
            Please wait while we process your submission&hellip;
          </p>
        </Section>
      </Article>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    user: state.user,
    upload: state.upload
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sendUpload: request => {
      dispatch(sendUpload(request))
    },
    getSubmissionProgress: submissionId => {
      dispatch(getSubmissionProgress(submissionId))
    },
    resetUploadStatus: () => {
      dispatch(resetUploadStatus())
    },
    setLoginRedirectRoutes: routes => {
      dispatch(setLoginRedirectRoutes(routes))
    },
    resetLoginRedirectRoutes: () => {
      dispatch(resetLoginRedirectRoutes())
    },
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
// NOTE: withRouter() props inherited from /containers/_screens/AppRoutesSubmit
