import { connect } from "react-redux"
import {
  storeContentState,
  loadTextContent
} from "@roast-cms/french-press-editor/dist/utils/browser-storage"
import React from "react"

import { withRouter } from "react-router"

import { Byline } from "../../../../core/components/styles/ArticleStyles"
import { CARD_DIALOGUES } from "../../../constants/messages-admin"
import { TEXT_EMOJIS } from "../../../../constants"
import { getSubmissionOrArticleRoute } from "../../../../core/utils/routes-article"
import {
  publishSubmission,
  rejectSubmission,
  setStatus
} from "../../../store/actions-editor"
import { setCard } from "../../../../core/store/actions-modal"
import { setComposerHeader } from "../../../../user/store/actions-composer"
import { storeHeaderState } from "../../../../user/utils/actions-submission"
import { updateArticleStatus } from "../../../../core/store/actions-article"
import EditorialControls from "./components/EditorialControls"
import PublishControls from "./components/PublishControls"
import StatusExplanation from "./components/StatusExplanation"

class AdminControls extends React.PureComponent {
  constructor(props) {
    super(props)
    const hash = window.location.hash
    this.state = {
      publishControls: false,
      publishAs: "",
      allowOverwrite: hash === "#overwrite" || !loadTextContent().length > 0,
      allowReject: hash === "#reject",
      allowPublish: hash === "#publish",
      allowSync: hash === "#sync"
    }
  }
  componentDidMount = () => {
    this.setState({
      allowOverwrite: window.location.hash
    })
  }
  componentWillReceiveProps = nextProps => {
    const hash = window.location.hash
    this.setState({
      allowOverwrite: hash === "#overwrite" || !loadTextContent().length > 0,
      allowReject: hash === "#reject",
      allowPublish: hash === "#publish",
      allowSync: hash === "#sync"
    })
    if (
      this.props.editor.reject.status === nextProps.editor.reject.status &&
      this.props.editor.publish.status === nextProps.editor.publish.status
    )
      return
    this.props.updateArticleStatus({
      url:
        getSubmissionOrArticleRoute(this.props.history.location.pathname)
          .apiRoute +
        this.props.history.location.pathname.replace(
          getSubmissionOrArticleRoute(this.props.history.location.pathname)
            .pathname,
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
    const isComposerEmpty = !loadTextContent().length > 0
    if (!isComposerEmpty && !this.state.allowOverwrite) {
      this.props.setCard(CARD_DIALOGUES.OVERWRITE_DRAFT)
      return
    }
    const header = {
      title: this.props.article.title || "",
      subtitle: this.props.article.subtitle || ""
    }
    this.props.setComposerHeader(header)
    storeHeaderState(header)
    storeContentState(this.props.article.content.raw)
    this.props.setStatus(
      this.props.article.id,
      this.props.article.status !== "published" ? "unpublished" : "published"
    )
    this.props.history.push("/submit/compose")
  }
  handlePublishControl = event => {
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
  handleRejection = event => {
    event.preventDefault()
    if (!this.state.allowReject) {
      this.props.setCard(CARD_DIALOGUES.REJECT)
      return
    }
    this.props.rejectSubmission(this.props.article.id)
  }
  handlePublishNow = event => {
    event.preventDefault()
    if (!this.state.allowPublish) {
      this.props.setCard(CARD_DIALOGUES.PUBLISH)
      return
    }
    this.props.publishSubmission(this.props.article.id, 0, this.state.publishAs)
  }
  handleSync = event => {
    event.preventDefault()
  }

  render = () => {
    return [
      <StatusExplanation
        key="ArticleControls_status"
        article={this.props.article}
      />,
      <EditorialControls
        key="ArticleControls_editorial"
        article={this.props.article}
        editor={this.props.editor}
        edit={this.handleEdit}
        sync={this.handleSync}
        reject={this.handleRejection}
        showPublishControls={this.handlePublishControl}
        stateAllowOverwrite={this.state.allowOverwrite}
        stateAllowSync={this.state.allowSync}
        stateAllowReject={this.state.allowReject}
        statePublishControls={this.state.publishControls}
      />,
      <Byline
        key="ArticleControls_rejected"
        style={{
          display: this.props.article.status === "rejected" ? "block" : "none"
        }}
      >
        <span style={{ fontStyle: "normal" }} role="img" aria-label="Notice">
          {TEXT_EMOJIS.STOP}
        </span>{" "}
        This submission has been REJECTED and can not be published or edited.
      </Byline>,
      <PublishControls
        key="ArticleControls_publish"
        article={this.props.article}
        editor={this.props.editor}
        statePublishControls={this.state.publishControls}
        statePublishAs={this.state.publishAs}
        stateAllowPublish={this.state.allowPublish}
        setPublicationTag={this.handlePublishTag}
        publishNow={this.handlePublishNow}
      />
    ]
  }
}

const mapStateToProps = state => {
  return {
    editor: state.editor,
    article: state.article
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    setStatus: (id, type) => {
      dispatch(setStatus(id, type))
    },
    rejectSubmission: id => {
      dispatch(rejectSubmission(id))
    },
    setComposerHeader: value => {
      dispatch(setComposerHeader(value))
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
