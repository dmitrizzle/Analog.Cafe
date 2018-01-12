// tools
import React from "react"
import Helmet from "../../../components/_async/Helmet"
import localForage from "localforage"
import "localforage-getitems"

// components
import {
  Article,
  Section,
  Header,
  Title,
  Subtitle
} from "../../../components/ArticleStyles"
import Link from "../../../components/Link"
import { LinkButton } from "../../../components/Button"

// constants & helpers
import {
  loadContent,
  loadHeader,
  loadTextContent
} from "../../../../utils/composer-loader"
import errorMessages from "../../../../constants/messages/errors"

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
  initStatus as resetUploadStatus
} from "../../../../actions/uploadActions"

// constants
const STATUS_MESSAGES = {
  pending: "Sending…",
  complete: "Done!",
  error: "Error"
}

// render
class Upload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      status: "pending"
    }
  }

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
        }
      }
    }
  }
  componentWillReceiveProps = nextProps => {
    // set progress state
    if (nextProps.upload.progress >= 0)
      this.setState({
        progress:
          nextProps.upload.progress > 0
            ? nextProps.upload.progress
            : this.state.progress
      }) // server connection error
    else
      this.setState({
        status: "error"
      })

    // upload complete
    if (nextProps.upload.progress === 100) {
      // clear submissions content and image in storage
      localStorage.removeItem("composer-content-state")
      localStorage.removeItem("composer-header-state")
      localStorage.removeItem("composer-content-text")
      localForage.clear()

      // reset upload state
      this.props.resetUploadStatus()

      // user-facing messages
      this.setState({
        status: "complete"
      })

      // const delayedRedirect = setTimeout(
      //   props => {
      //     props.history.replace({ pathname: ROUTE_REDIRECT_AFTER_SUBMIT })
      //     clearTimeout(delayedRedirect)
      //   },
      //   1000, // wait a second to make sure the list of contributions has been updated
      //   this.props
      // )
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
    return (
      <Article>
        <Helmet>
          <title>Sending…</title>
        </Helmet>
        <Header>
          <Title>{this.state.progress}%</Title>
          <Subtitle>{STATUS_MESSAGES[this.state.status]}</Subtitle>
        </Header>

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
          {this.state.status === "pending" && (
            <p>
              <strong>
                <span role="img" aria-label="Warning">
                  ⚠️
                </span>{" "}
                Please keep this page open, do not refresh and do not click your
                browser’s “back” button
              </strong>{" "}
              while your submission is sending (uploading).
            </p>
          )}
          {this.state.status === "error" && (
            <p>
              <strong>{errorMessages.VIEW_TEMPLATE.SUBMISSION.text}</strong>{" "}
              <a
                href="#reload"
                onClick={event => {
                  event.preventDefault()
                  window.location.reload()
                }}
              >
                Try again
              </a>{" "}
              or{" "}
              <Link
                to={
                  process.env.NODE_ENV === "development"
                    ? "/submit/compose"
                    : "/beta/compose"
                }
              >
                go back
              </Link>.
            </p>
          )}
          {this.state.status === "complete" && (
            <div>
              <p>
                We’ve received your work. It’ll take a couple of minutes to
                process the images – after that, you should be able to see your
                it <Link to="/me">here</Link>.
              </p>
              <p>Thank you so much for your contribution!</p>
              <LinkButton red to="/me">
                My Submissions
              </LinkButton>
            </div>
          )}
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
