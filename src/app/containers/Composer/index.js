// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { requestFocus as requestEditorFocus } from "../../../actions/composerActions"

// components
import HeaderEditor from "./containers/HeaderEditor"
import ContentEditor from "./containers/ContentEditor"
import { Section } from "../../components/ArticleStyles"
import { ModalDispatch } from "../Modal"

import emojis from "../../../constants/messages/emojis"
import {
  MESSAGE_HINT_SUBMIT_CONSENT,
  MESSAGE_HINT_SUBMIT_EDITORS
} from "../../../constants/messages/hints"

// placeholders
const titlePlaceholder = {
  title: "Title",
  subtitle: "Subtitle (Optional)"
}

// return
const Composer = props => {
  return [
    <HeaderEditor
      pageTitle={titlePlaceholder.title}
      pageSubtitle={titlePlaceholder.subtitle}
      key="Composer_HeaderEditor"
    />,
    <Section onClick={() => props.requestEditorFocus()} key="Composer_Section">
      <ContentEditor
        ref={input => {
          this.contentEditor = input
        }}
      />
    </Section>,
    <ModalDispatch
      key="Composer_Send"
      with={
        props.composer.submissionStatus.id && props.user.info.role === "admin"
          ? MESSAGE_HINT_SUBMIT_EDITORS
          : MESSAGE_HINT_SUBMIT_CONSENT
      }
      wrapperElement="Button"
      red
    >
      Send Submission {emojis.CHECKMARK}
    </ModalDispatch>
  ]
}

// connect with redux
const mapStateToProps = state => {
  return {
    composer: state.composer,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    requestEditorFocus: () => {
      dispatch(requestEditorFocus())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Composer)

// NOTE: this is a pure component but it's in the containers folder to help tie
// everything together.
