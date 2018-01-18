// tools
import React from "react"
import { withRouter } from "react-router"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../actions/modalActions"
import { setSubmissionId } from "../../../../actions/composerActions"

// components
import { ButtonStrip, Item } from "../../../components/_controls/ButtonStrip"

// utils
import { loadTextContent } from "../../../../utils/composer-loader"
import { MESSAGE_HINT_OVERWRITE_DRAFT } from "../../../../constants/messages/hints"
import {
  storeContentState,
  storeHeaderState
} from "../../../../utils/composer-saver"

class AdminControls extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allowOverwrite: window.location.hash
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
      allowOverwrite: window.location.hash
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
  render = () => {
    return (
      <ButtonStrip
        style={{
          margin: "1em auto 0"
        }}
      >
        <div>
          <Item left red={this.state.allowOverwrite} onClick={this.handleEdit}>
            Edit
          </Item>
          {this.props.publicationStatus === "published" ? (
            <Item right>Unpublish</Item>
          ) : (
            <Item right>Publish</Item>
          )}
        </div>
      </ButtonStrip>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    setSubmissionId: id => {
      dispatch(setSubmissionId(id))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AdminControls))
