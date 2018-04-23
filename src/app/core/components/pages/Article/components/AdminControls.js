import { connect } from "react-redux"
import {
  storeContentState,
  loadTextContent
} from "@roast-cms/french-press-editor/dist/utils/browser-storage"
import React from "react"

import { withRouter } from "react-router"

import { Button } from "../../../controls/Button"
import { ButtonStrip, Item } from "../../../controls/ButtonStrip"
import { Byline } from "../../../styles/ArticleStyles"
import { CardFlattened } from "../../../controls/Card/styles"
import {
  MESSAGE_HINT_OVERWRITE_DRAFT,
  MESSAGE_HINT_PUBLISH_SUBMISSION,
  MESSAGE_HINT_REJECT_SUBMISSION,
  MESSAGE_HINT_SYNC_SUBMISSION
} from "../../../../../user/constants/hints"
import {
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../../constants/article"
import { locate } from "../../../../utils/article-utils"
import { setCard } from "../../../../store/actions/modalActions"
import {
  setSubmissionStatus,
  rejectSubmission,
  publishSubmission,
  setHeadingValues
} from "../../../../../user/store/actions/composerActions"
import { storeHeaderState } from "../../../../../user/utils/browser-storage"
import { updateStatus as updateArticleStatus } from "../../../../store/actions/articleActions"
import Link from "../../../controls/Link"
import EMOJI from "../../../../constants/EMOJI"

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
    const hash = window.location.hash
    this.state = {
      publishControls: false,
      publishAs: "",

      // URL hashtag flags that unlock dangerous functions
      allowOverwrite: hash === "#overwrite" || !loadTextContent().length > 0,
      allowReject: hash === "#reject",
      allowPublish: hash === "#publish",
      allowSync: hash === "#sync"
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
    const hash = window.location.hash
    this.setState({
      allowOverwrite: hash === "#overwrite" || !loadTextContent().length > 0,
      allowReject: hash === "#reject",
      allowPublish: hash === "#publish",
      allowSync: hash === "#sync"
    })

    // refresh status & controls:
    if (
      this.props.composer.submissionAdmin.reject.status ===
        nextProps.composer.submissionAdmin.reject.status &&
      this.props.composer.submissionAdmin.publish.status ===
        nextProps.composer.submissionAdmin.publish.status
    )
      return
    this.props.updateArticleStatus({
      url:
        locate(this.props.history.location.pathname).apiRoute +
        this.props.history.location.pathname.replace(
          locate(this.props.history.location.pathname).pathname,
          ""
        )
    })
    this.setState({
      publishControls: false,
      publishAs: ""
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

    // replace redux store values for header
    const headingValues = {
      title: this.props.article.title || "",
      subtitle: this.props.article.subtitle || ""
    }
    this.props.setHeadingValues(headingValues)

    // replace localStorage drafts with current article content
    storeHeaderState(headingValues)
    storeContentState(this.props.article.content.raw)

    // set submission id so that the correct article would be updated with upload
    this.props.setSubmissionStatus(
      this.props.article.id,
      this.props.article.status !== "published" ? "unpublished" : "published"
    )

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
  // (request to server)
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

  // publish immediately
  // (request to server)
  handlePublishNow = event => {
    event.preventDefault()

    // warn about immediate publication
    if (!this.state.allowPublish) {
      this.props.setCard(MESSAGE_HINT_PUBLISH_SUBMISSION)
      return
    }
    this.props.publishSubmission(this.props.article.id, 0, this.state.publishAs)
  }

  // sync published article with submission
  handleSync = event => {
    event.preventDefault()

    // warn about immediate publication
    if (!this.state.allowSync) {
      this.props.setCard(MESSAGE_HINT_SYNC_SUBMISSION)
      return
    }
    this.props.publishSubmission(this.props.article.id, 0, this.state.publishAs)
  }

  render = () => {
    return [
      <Byline
        key="Byline_scheduled"
        style={{
          display: "block"
        }}
      >
        {(this.props.article.status === "scheduled" ||
          this.props.article.status === "published") && (
          <span style={{ fontStyle: "normal" }} role="img" aria-label="Notice">
            {EMOJI.WARNING}
          </span>
        )}{" "}
        {this.props.article.status === "scheduled" &&
          "This is a SCHEDULED submission that you can edit while it is in the queue."}
        {this.props.article.status === "published" &&
          this.props.article.articleId && (
            <span>
              This is an <strong>original submission</strong>, linked with{" "}
              <Link to={`${ROUTE_URL_ARTICLES}/${this.props.article.slug}`}>
                this published article
              </Link>. You can edit it and then sync your changes to the
              published article.
            </span>
          )}
        {this.props.article.status === "published" &&
          !this.props.article.articleId && (
            <span>
              This is a <strong>published article</strong>, linked with{" "}
              <Link to={`${ROUTE_URL_SUBMISSIONS}/${this.props.article.slug}`}>
                this submission
              </Link>. Your edits will be applied to that submission, which you
              can then sync with this article.
            </span>
          )}
      </Byline>,

      <ButtonStrip
        style={{
          margin: "1em auto 0",
          width: "16em",
          display: this.props.article.status !== "rejected" ? "block" : "none"
        }}
        key="controls"
      >
        <div>
          <Item
            left
            onClick={this.handleEdit}
            style={{
              minWidth: "5em"
            }}
          >
            <span role="img" aria-label="(Un)Locked button">
              {this.state.allowOverwrite ? EMOJI.LOCKED : EMOJI.UNLOCKED}
            </span>{" "}
            Edit
          </Item>
          {this.props.article.status === "published"
            ? [
                <Item key="ButtonStrip_Item_update" onClick={this.handleSync}>
                  <span role="img" aria-label="(Un)Locked button">
                    {this.state.allowSync ? EMOJI.LOCKED : EMOJI.UNLOCKED}
                  </span>{" "}
                  Sync
                </Item>,
                <Item key="ButtonStrip_Item_unpublish" right>
                  Unpublish
                </Item>
              ]
            : [
                <Item
                  key="ButtonStrip_Item_reject"
                  onClick={this.handleRejection}
                  inverse={
                    this.props.composer.submissionAdmin.reject.id ===
                    this.props.article.id
                  }
                  style={{
                    minWidth: "6em",
                    display:
                      this.props.article.status !== "scheduled"
                        ? "block"
                        : "none"
                  }}
                >
                  <span role="img" aria-label="(Un)Locked button">
                    {this.state.allowReject ? EMOJI.LOCKED : EMOJI.UNLOCKED}
                  </span>{" "}
                  Reject
                </Item>,
                <Item
                  right
                  inverse={this.state.publishControls}
                  style={
                    this.props.article.status === "scheduled"
                      ? { minWidth: "8em" }
                      : {}
                  }
                  onClick={
                    this.props.article.status !== "scheduled"
                      ? this.handlePblishControls
                      : null
                  }
                  key="ButtonStrip_Item_publish"
                >
                  {this.props.article.status !== "scheduled"
                    ? "Publish"
                    : "Edit Schedule"}
                </Item>
              ]}
        </div>
      </ButtonStrip>,
      <Byline
        key="Byline_rejected"
        style={{
          display: this.props.article.status === "rejected" ? "block" : "none"
        }}
      >
        <span style={{ fontStyle: "normal" }} role="img" aria-label="Notice">
          {EMOJI.STOP}
        </span>{" "}
        This submission has been REJECTED and can not be published or edited.
      </Byline>,
      <div
        key="div_scheduler"
        style={{ display: this.state.publishControls ? "block" : "none" }}
      >
        <ButtonStrip
          style={{
            margin: "0.5em auto 0",
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
                  inverse={this.state.publishAs === key}
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
            marginTop: "0.5em",
            display: this.state.publishAs ? "block" : "none"
          }}
        >
          <Button branded>Add to Queue</Button>
          <Button
            onClick={this.handlePublishNow}
            loading={
              this.props.composer.submissionAdmin.publish.id ===
              this.props.article.id
            }
          >
            {this.props.composer.submissionAdmin.publish.id !==
              this.props.article.id &&
              (this.state.allowPublish ? EMOJI.LOCKED : EMOJI.UNLOCKED)}{" "}
            Publish Now
          </Button>
        </CardFlattened>
      </div>
    ]
  }
}

const mapStateToProps = state => {
  return {
    composer: state.composer,
    article: state.article
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    setSubmissionStatus: (id, type) => {
      dispatch(setSubmissionStatus(id, type))
    },
    rejectSubmission: id => {
      dispatch(rejectSubmission(id))
    },
    setHeadingValues: value => {
      dispatch(setHeadingValues(value))
    },
    publishSubmission: (id, scheduledOrder, tag) => {
      dispatch(publishSubmission(id, scheduledOrder, tag))
    },
    updateArticleStatus: request => {
      dispatch(updateArticleStatus(request))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminControls)
)
