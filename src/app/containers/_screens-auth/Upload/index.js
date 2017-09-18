// tools
import React from "react"
import Helmet from "react-helmet"

import { connect } from "react-redux"

import localForage from "localforage"
import "localforage-getitems"

// components
import Heading from "../../../components/ArticleHeading"
import { Article, Section } from "../../../components/ArticleStyles"

// constants & helpers
import { loadContent, loadHeader } from "../../Composer/helpers/loader"
import { WEBSOCKET_UPLOAD_PROGRESS } from "../../../../constants/submission"
import { ROUTE_REDIRECT_AFTER_SUBMIT } from "../../../../constants/submission"
import emojis from "../../../../constants/messages/emojis"

import { redirectToSignIn, sendSubmission } from "./helpers"

// redux actions
import {
  setRoutes as setLoginRedirectRoutes,
  resetRoutes as resetLoginRedirectRoutes
} from "../../../../actions/userActions"
import {
  send as sendUpload,
  initStatus as resetUploadStatus
} from "../../../../actions/uploadActions"

// render
class Upload extends React.PureComponent {
  constructor(props) {
    super(props)
    this.socketUpload = new WebSocket(WEBSOCKET_UPLOAD_PROGRESS)
  }
  componentDidMount = () => {
    // redirects
    if (!localStorage.getItem("token")) {
      redirectToSignIn(this.props)
    } else {
      this.props.resetLoginRedirectRoutes()

      // WebSocket
      this.socketUpload.addEventListener("message", function(event) {
        console.log("Upload image form server to cloundinary: " + event.data)
      })

      // construct submission data
      const submissionConsent = this.props.history.location.pathname.includes(
        "full-consent"
      )
      const content = loadContent()
      const header = loadHeader()
      let keys = []
      if (content && content.document && content.document.nodes) {
        // form adata obj
        let data = new FormData()
        data.append("content", JSON.stringify(content))
        data.append("header", JSON.stringify(header))
        data.append("isFullConsent", submissionConsent)

        // get filename keys for the saved images in the submission
        for (var i = 0; i < content.document.nodes.length; i++) {
          var node = content.document.nodes[i]
          if (node && node.data && node.data.key) {
            keys.push(node.data.key)
          }
        }
        if (keys.length > 0) {
          const _this = this // perhaps binding "this" to localForage fn would have been the right decision instead of _this - but I don't know and don't care to do this atm
          localForage.getItems(keys).then(function(results) {
            for (var i = 0; i < keys.length; i++) {
              data.append("images[" + keys[i] + "]", results[keys[i]])
            }
            sendSubmission(data, _this.props)
          })
        } else {
          console.log("no images")
          sendSubmission(data, this.props)
        }
      } else {
        // content deleted
        // TODO notify users that content is deleted or missplaced
        this.props.history.replace({
          pathname: ROUTE_REDIRECT_AFTER_SUBMIT
        })
      }
    }
  }

  componentWillReceiveProps = () => {
    if (this.props.upload.status === "ok") {
      // clear submissions content and image in storage
      localStorage.removeItem("composer-content-state")
      localStorage.removeItem("composer-header-state")
      localForage.clear()
      // close connection listener
      this.socketUpload.close()
      // reset upload state
      this.props.resetUploadStatus()
      // redirect after submission complete
      this.props.history.replace({
        pathname: ROUTE_REDIRECT_AFTER_SUBMIT
      })
    } else if (this.props.upload.status !== "pending") {
      // submission not in progress
      this.socketUpload.close() // close socket connection
      // if user is unauthorized, redirect to sign in page
      if (this.props.upload.status === "unauthorized") {
        redirectToSignIn(this.props)
      }
    }
  }

  render = () => {
    return (
      <Article>
        <Helmet>
          <title>Uploading Submissoin…</title>
        </Helmet>
        <Heading pageTitle={emojis.NEONCAT} pageSubtitle="Sending…" />
        <Section>
          <p>
            You have requested
            <em>
              {this.props.history.location.pathname.includes("full-consent") ===
              true ? (
                " more exposure. "
              ) : (
                " no additional exposure. "
              )}
            </em>
            Please wait while we process your submission&hellip;
          </p>
        </Section>
      </Article>
    )
  }
}

// connet with redux
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
    resetUploadStatus: () => {
      dispatch(resetUploadStatus())
    },
    setLoginRedirectRoutes: routes => {
      dispatch(setLoginRedirectRoutes(routes))
    },
    resetLoginRedirectRoutes: () => {
      dispatch(resetLoginRedirectRoutes())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
// NOTE: withRouter() props inherited from /containers/_screens/AppRoutesSubmit
