import { connect } from "react-redux"
import React from "react"

import {
  CARD_ALERTS,
  CARD_DIALOGUES
} from "../../../constants/messages-submission"
import { CARD_DIALOGUES as CARD_DIALOGUES_ADMIN } from "../../../../admin/constants/messages-admin"
import { TEXT_EMOJIS } from "../../../../constants"
import { requestComposerFocus as requestEditorFocus } from "../../../store/actions-composer"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ComposerWrapper from "./components/ComposerWrapper"
import DraftStatusText from "./components/DraftStatusText"
import Editor from "./components/Editor"
import Modal from "../../../../core/components/controls/Modal"
import TitleCreator from "./components/TitleCreator"
import WordCounter from "./components/WordCounter"

const TITLE_PLACEHOLDER = {
  title: "Title",
  subtitle: "Subtitle (Optional)"
}
const Composer = props => {
  return (
    <ComposerWrapper>
      <TitleCreator
        pageTitle={TITLE_PLACEHOLDER.title}
        pageSubtitle={TITLE_PLACEHOLDER.subtitle}
      />
      <ArticleSection
        onClick={() => props.requestEditorFocus()}
        key="Composer_Section"
      >
        <Editor />
      </ArticleSection>
      <Modal
        style={{ marginBottom: "0.25em" }}
        with={
          props.editor.status.id
            ? CARD_DIALOGUES_ADMIN.SAVE_EDITS
            : CARD_DIALOGUES.CONSENT
        }
        element="Button"
        branded
      >
        {props.editor.status.id ? "Submit Changes " : "Send Submission "}
        {TEXT_EMOJIS.CHECKMARK}
      </Modal>
      <DraftStatusText>
        Your draft is <Modal with={CARD_ALERTS.AUTO_SAVE}>saved</Modal>. You’ve
        written <WordCounter /> words.
      </DraftStatusText>
    </ComposerWrapper>
  )
}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Composer)
