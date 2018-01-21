// tools
import React from "react"
import { withRouter } from "react-router"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../actions/modalActions"
import {
  setSubmissionId,
  rejectSubmission
} from "../../../../actions/composerActions"

// components
import { Button } from "../../../components/_controls/Button"
import { CardFlattened } from "../../../components/Card/styles"
import { ButtonStrip, Item } from "../../../components/_controls/ButtonStrip"

// utils
import { loadTextContent } from "../../../../utils/composer-loader"
import {
  MESSAGE_HINT_OVERWRITE_DRAFT,
  MESSAGE_HINT_REJECT_SUBMISSION
} from "../../../../constants/messages/hints"
import {
  storeContentState,
  storeHeaderState
} from "../../../../utils/composer-saver"

const TAGS = {
  story: "Story",
  editorial: "Editorial",
  guide: "Guide",
  review: "Review",
  "photo-essay": "Photo Essay"
}

class AdminControls extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allowOverwrite: window.location.hash === "#overwrite",
      allowReject: window.location.hash === "#reject",
      publishControls: false,
      publishAs: ""
    }
  }
  componentDidMount = () => {
    // if #overwrite hash is present, "unlock" edit button in overwrite mode
    this.setState({
      allowOverwrite: window.location.hash
    })
  }
  componentWillReceiveProps = nextProps => {
    // if #overwrite hash is present, "unlock" edit button in overwrite mode
    this.setState({
      allowOverwrite: window.location.hash === "#overwrite",
      allowReject: window.location.hash === "#reject"
    })
  }
  handleEdit = event => {
    event.preventDefault()

    // warn about overwriting existing draft
    const isComposerEmpty = !loadTextContent().length > 0
    if (!isComposerEmpty && !this.state.allowOverwrite) {
      this.props.setCard(MESSAGE_HINT_OVERWRITE_DRAFT)
      return
    }

    // replace localStorage drafts with current article content
    storeContentState(this.props.article.content.raw)
    storeHeaderState({
      title: this.props.article.title || "",
      subtitle: this.props.article.subtitle || ""
    })

    // set submission id so that the correct article would be updated with upload
    this.props.setSubmissionId(this.props.article.id)

    // redirect to Composer
    this.props.history.push("/submit/compose")
  }

  // publish conntrols
  handlePblishControls = event => {
    event.preventDefault()
    this.setState({
      publishControls: !this.state.publishControls
    })
  }
  handlePublishTag = (event, tag) => {
    event.preventDefault()
    this.setState({
      publishAs: tag === this.state.publishAs ? "" : tag
    })
  }

  // mark as rejected
  handleRejection = event => {
    event.preventDefault()

    // warn about overwriting existing draft
    if (!this.state.allowReject) {
      this.props.setCard(MESSAGE_HINT_REJECT_SUBMISSION)
      return
    }

    // send request to reject the submission
    this.props.rejectSubmission(this.props.article.id)
  }

  render = () => {
    return [
      <ButtonStrip
        style={{
          margin: "1em auto 0",
          width: "16em"
        }}
        key="controls"
      >
        <div>
          <Item left onClick={this.handleEdit} style={{ minWidth: "5em" }}>
            <span role="img" aria-label="(Un)Locked button">
              {this.state.allowOverwrite ? "🔓" : "🔐"}
            </span>{" "}
            Edit
          </Item>
          {this.props.publicationStatus === "published" ? (
            <Item right>Unpublish</Item>
          ) : (
            [
              <Item
                key="reject"
                onClick={this.handleRejection}
                style={{ minWidth: "6em" }}
              >
                <span role="img" aria-label="(Un)Locked button">
                  {this.state.allowReject ? "🔓" : "🔐"}
                </span>{" "}
                Reject
              </Item>,
              <Item
                right
                black={this.state.publishControls}
                onClick={this.handlePblishControls}
                key="publish"
              >
                Publish
              </Item>
            ]
          )}
        </div>
      </ButtonStrip>,
      <div
        key="scheduler"
        style={{ display: this.state.publishControls ? "block" : "none" }}
      >
        <ButtonStrip
          style={{
            margin: "1.5em auto 0",
            width: "auto",
            overflow: "scroll",
            padding: "1px 1px 3px"
          }}
        >
          <div>
            {Object.keys(TAGS).map((key, i) => {
              let last = i === Object.keys(TAGS).length - 1
              return (
                <Item
                  left={i === 0}
                  right={last}
                  key={key}
                  onClick={event => this.handlePublishTag(event, key)}
                  style={key === "photo-essay" ? { minWidth: "7.5em" } : {}}
                  black={this.state.publishAs === key}
                  to={`#${key}`}
                >
                  {TAGS[key]}
                </Item>
              )
            })}
          </div>
        </ButtonStrip>
        <CardFlattened
          style={{
            marginBottom: 0,
            display: this.state.publishAs ? "block" : "none"
          }}
        >
          <Button red>Add to Queue</Button>
          <Button>Publish Now</Button>
        </CardFlattened>
      </div>
    ]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    setSubmissionId: id => {
      dispatch(setSubmissionId(id))
    },
    rejectSubmission: id => {
      dispatch(rejectSubmission(id))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminControls))
