// tools
import React from "react"
import Helmet from "../../../components/_async/Helmet"
//import throttle from "lodash/throttle"

import localForage from "localforage"
import "localforage-getitems"

// components
import Heading from "../../../components/ArticleHeading"
import { Article, Section } from "../../../components/ArticleStyles"

// constants & helpers
import {
  loadContent,
  loadHeader,
  loadTextContent
} from "../../../../utils/composer-loader"
import errorMessages from "../../../../constants/messages/errors"
import { ROUTE_REDIRECT_AFTER_SUBMIT } from "../../../../constants/submission"

import {
  redirectToSignIn,
  sendSubmission
} from "../../../../utils/upload-utils"

// redux actions
import { connect } from "react-redux"
import { setCard } from "../../../../actions/modalActions"
import {
  setRoutes as setLoginRedirectRoutes,
  resetRoutes as resetLoginRedirectRoutes
} from "../../../../actions/userActions"
import {
  uploadData as uploadSubmissionData,
  initStatus as resetUploadStatus,
  syncStatus as syncUploadStatus
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
      const textContent = loadTextContent()
      if (!(content && content.document && content.document.nodes)) {
        return this.handleEmptySubmission()
      }

      // form data obj
      let data = new FormData()
      data.append("content", JSON.stringify(content))
      data.append("header", JSON.stringify(header))
      data.append("textContent", textContent)
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
          content.document.nodes
            .filter(node => !!(node.data && node.data.src))
            .forEach(node => (node.data.src = null))
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
        } else {
          // images are URLs from the web
          sendSubmission(data, this.props)
          console.log("Uploading with images as URLs")
        }
      }
    }
  }
  componentWillReceiveProps = nextProps => {
    // redirect users who aren't logged in
    if (this.props.upload.status === "unauthorized") {
      redirectToSignIn(this.props)
      return
    }

    // get progress status from the server
    if (
      nextProps.upload.status === "ok" ||
      nextProps.upload.status === "pending"
    ) {
      if (this.props.upload.status === nextProps.upload.status) return
      // "fetching" indicates that submission request is submitted but
      // server hasn't returned the details along with the id, which
      // is required to track progress
      if (nextProps.upload.progressReq === "fetching" || !nextProps.upload.data)
        return
      const periodical = setInterval(() => {
        // download status from api
        nextProps.syncUploadStatus(nextProps.upload.data.id)
        // upload complete
        if (parseFloat(this.props.upload.progress) === 100) {
          clearInterval(periodical)
          // clear submissions content and image in storage
          localStorage.removeItem("composer-content-state")
          localStorage.removeItem("composer-header-state")
          localStorage.removeItem("composer-content-text")
          localForage.clear()
          // reset upload state
          this.props.resetUploadStatus()
          // redirect after submission complete
          const delayedRedirect = setTimeout(
            props => {
              props.history.replace({ pathname: ROUTE_REDIRECT_AFTER_SUBMIT })
              clearTimeout(delayedRedirect)
            },
            1000, // wait a second to make sure the list of contributions has been updated
            this.props
          )
        }
      }, 1000)
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

  render = () => {
    const progress = `${
      this.props.upload && this.props.upload.progress
        ? parseFloat(this.props.upload.progress)
        : 0
    }%`
    return (
      <Article>
        <Helmet>
          <title>Sending…</title>
        </Helmet>
        <Heading pageTitle={progress} pageSubtitle={"Sending…"} />
        <Section>
          <p>
            You have marked your submission as
            <em>
              {this.props.history.location.pathname.includes("full-consent") ===
              true
                ? " open for collaborations. "
                : " closed to collaborations. "}
            </em>
          </p>
          <p>
            Please keep this page open and do not refresh while your submission
            is sending (uploading).
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
    uploadSubmissionData: request => {
      dispatch(uploadSubmissionData(request))
    },
    syncUploadStatus: submissionId => {
      dispatch(syncUploadStatus(submissionId))
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
