import { FrenchPress } from "@roast-cms/french-press-editor"
import { connect } from "react-redux"
import React from "react"

import { CARD_ERRORS } from "../../../../constants/messages-submission"
import { CARD_ERRORS as CARD_ERRORS_SESSION } from "../../../../constants/messages-session"
import { HOST_PROD } from "../../../../../constants"
import { ToggleFeature } from "../plugins"
import { setComposerSatus } from "../../../../store/actions-composer"
import { setModal } from "../../../../../core/store/actions-modal"
import CapitalA from "../../../icons/Glyphs/components/CapitalA"
import LowerA from "../../../icons/Glyphs/components/LowerA"
import Picture from "../../../../../core/components/vignettes/Picture"

class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      connectionMessageShown: false
    }
  }
  editorRef = editor => {
    this.editor = editor
  }
  handleEditorError = error => {
    if (error === "insert_image") {
      this.props.setModal(
        {
          status: "ok",
          info: CARD_ERRORS.IMAGE_SIZE(10)
        },
        { url: "errors/upload" }
      )
    }
  }
  componentWillReceiveProps = nextProps => {
    if (
      this.props.composer.focusRequested < nextProps.composer.focusRequested
    ) {
      this.editor.focus()
    }
    if (
      !this.state.connectionMessageShown &&
      nextProps.user.connection.status === "offline"
    ) {
      this.props.setModal(CARD_ERRORS_SESSION.CONNECTION_OFFLINE)
      this.setState({ connectionMessageShown: true })
    }
  }
  render = () => {
    return (
      <FrenchPress
        components={{
          Picture
        }}
        callbackStatus={this.props.setComposerSatus}
        controls={{
          MakeHeader: () => <CapitalA />,
          CancelHeader: () => <LowerA />,
          MakeQuote: () => <span>❝</span>,
          MakeLink: () => <u>link</u>,
          MakeBold: () => <strong>bold</strong>,
          MakeItalic: () => <em>italic</em>,
          UploadImage: () => <span>↫ Add Image</span>
        }}
        options={{
          domain: HOST_PROD
        }}
        callbackError={this.handleEditorError}
        editorRef={this.editorRef}
        slatePlugins={[ToggleFeature({ key: "f", node: "image" })]}
      />
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    },
    setComposerSatus: status => {
      dispatch(setComposerSatus(status))
    }
  }
}
const mapStateToProps = state => {
  return {
    composer: state.composer,
    user: state.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor)
