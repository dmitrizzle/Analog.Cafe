import "localforage-getitems"

import { connect } from "react-redux"
import {
  loadTextContent,
  loadContent
} from "@roast-cms/french-press-editor/dist/utils/browser-storage"
import React from "react"
import localForage from "localforage"

import {
  Article,
  Header,
  Section,
  Subtitle,
  Title
} from "../../../../core/components/styles/ArticleStyles"
import { CARD_ERRORS } from "../../../constants/messages-submission"
import { LinkButton } from "../../../../core/components/controls/Button"
import { TEXT_EMOJIS } from "../../../../constants"
import { loadHeader, sendSubmission } from "../../../utils/actions-submission"
import { redirectToSignIn } from "../../../utils/actions-session"
import { resetComposer } from "../../../store/actions-composer"
import { setCard } from "../../../../core/store/actions-modal"
import {
  setRoutes as setLoginRedirectRoutes,
  resetRoutes as resetLoginRedirectRoutes
} from "../../../store/actions-user"
import {
  uploadSubmission,
  resetUploadProgress,
  resetstatus
} from "../../../store/actions-submission"
import Helmet from "../../../../core/components/vignettes/Helmet"
import Link from "../../../../core/components/controls/Link"

// constants
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
              info: CARD_ERRORS.SEND_IMAGES_MISSING
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
    if (
      nextProps.submission.uploadProgress ===
      this.props.submission.uploadProgress
    )
      return

    // set progress state
    if (nextProps.submission.uploadProgress >= 0)
      this.setState({
        progress:
          nextProps.submission.uploadProgress > 0
            ? nextProps.submission.uploadProgress
            : this.state.progress
      })
    // server connection error
    else
      this.setState({
        status: "error"
      })

    //
    //
    //
    //
    //
    // upload complete
    if (
      this.props.submission.uploadProgress >= 0 &&
      nextProps.submission.uploadProgress === 100
    ) {
      // clear submissions content and image in storage
      localStorage.removeItem("composer-content-text")
      localForage.clear()

      // clear store for Composer values
      this.props.resetComposer()

      // reset upload state
      this.props.resetUploadProgress()

      // remove working submission id
      this.props.resetstatus()

      // user-facing messages
      this.setState({
        status: "complete"
      })
    }
    //
    //
    //
    //
    //
    //
  }

  handleEmptySubmission = () => {
    this.props.setCard(
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
              <p>
                We’ve received your work. It’ll take a couple of minutes to
                process the images – after that, you should be able to see it{" "}
                <Link to="/me">here</Link>.
              </p>
              <p>Thank you so much for your contribution!</p>
              <LinkButton branded to="/me">
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
    composer: state.composer,
    submission: state.submission,
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
    resetstatus: () => {
      dispatch(resetstatus())
    },
    setLoginRedirectRoutes: routes => {
      dispatch(setLoginRedirectRoutes(routes))
    },
    resetLoginRedirectRoutes: () => {
      dispatch(resetLoginRedirectRoutes())
    },
    resetComposer: () => {
      dispatch(resetComposer())
    },
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
// NOTE: withRouter() props inherited from /containers/_screens/AppRoutesSubmit
