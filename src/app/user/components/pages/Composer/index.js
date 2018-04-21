import { connect } from "react-redux"
import React from "react"

import {
  MESSAGE_HINT_AUTO_SAVE,
  MESSAGE_HINT_SUBMIT_CONSENT,
  MESSAGE_HINT_SUBMIT_EDITORS
} from "../../../constants/hints"
import { ModalDispatch } from "../../../../core/components/controls/Modal"
import { Section } from "../../../../core/components/styles/ArticleStyles"
import { requestFocus as requestEditorFocus } from "../../../store/actions/composerActions"
import ContentEditor from "./components/ContentEditor"
import DraftStatusText from "./components/ContentEditor/components/DraftStatusText"
import HeaderEditor from "./components/HeaderEditor"
import emojis from "../../../../core/constants/emojis"

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
      style={{ marginBottom: "0.25em" }}
      key="Composer_Send"
      with={
        props.composer.submissionStatus.id && props.user.info.role === "admin"
          ? MESSAGE_HINT_SUBMIT_EDITORS
          : MESSAGE_HINT_SUBMIT_CONSENT
      }
      wrapperElement="Button"
      branded
    >
      Send Submission {emojis.CHECKMARK}
    </ModalDispatch>,
    <DraftStatusText key={"Composer_DraftStatus"}>
      Your draft is{" "}
      <ModalDispatch with={MESSAGE_HINT_AUTO_SAVE}>saved</ModalDispatch>.
    </DraftStatusText>
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
