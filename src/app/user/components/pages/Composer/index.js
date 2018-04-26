import { connect } from "react-redux"
import React from "react"

import {
  CARD_ALERTS,
  CARD_DIALOGUES
} from "../../../constants/messages-submission"
import { CARD_DIALOGUES as CARD_DIALOGUES_ADMIN } from "../../../../admin/constants/messages-admin"
import { ModalDispatch } from "../../../../core/components/controls/Modal"
import { Section } from "../../../../core/components/styles/ArticleStyles"
import { TEXT_EMOJIS } from "../../../../constants"
import { requestComposerFocus as requestEditorFocus } from "../../../store/actions-composer"
import ContentEditor from "./components/ContentEditor"
import DraftStatusText from "./components/ContentEditor/components/DraftStatusText"
import HeaderEditor from "./components/HeaderEditor"

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
        props.editor.status.id && props.user.info.role === "admin"
          ? CARD_DIALOGUES_ADMIN.SAVE_EDITS
          : CARD_DIALOGUES.CONSENT
      }
      wrapperElement="Button"
      branded
    >
      Send Submission {TEXT_EMOJIS.CHECKMARK}
    </ModalDispatch>,
    <DraftStatusText key={"Composer_DraftStatus"}>
      Your draft is{" "}
      <ModalDispatch with={CARD_ALERTS.AUTO_SAVE}>saved</ModalDispatch>.
    </DraftStatusText>
  ]
}

// connect with redux
const mapStateToProps = state => {
  return {
    editor: state.editor,
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
