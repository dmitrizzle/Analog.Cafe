import { connect } from "react-redux"
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/storage"
import React from "react"

import { CARD_DIALOGUES } from "../../../../admin/constants/messages-admin"
import { TEXT_EMOJIS } from "../../../../constants"
import { setModal } from "../../../../core/store/actions-modal"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Button from "../../../../core/components/controls/Button/components/Button"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"

const composerContentStateBackup = localStorage.getItem(
  "backup-composer-content-state"
)
const composerHeaderStateBackup = localStorage.getItem(
  "backup-composer-header-state"
)

class RestoreComposerBackup extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allowOverwrite: false
    }
    this.handleRestore = this.handleRestore.bind(this)
  }
  handleRestore = event => {
    event.preventDefault()
    if (loadTextContent().length > 0 && !this.state.allowOverwrite) {
      this.props.setModal(
        CARD_DIALOGUES.OVERWRITE_DRAFT(this.handleUnlockFunction)
      )
      return
    }

    composerHeaderStateBackup &&
      localStorage.setItem("composer-header-state", composerHeaderStateBackup)
    composerContentStateBackup &&
      localStorage.setItem("composer-content-state", composerContentStateBackup)

    this.props.history.push("/submit/compose")
  }
  handleUnlockFunction = (event, functionName) => {
    event.preventDefault()
    this.setState({
      [functionName]: true
    })
  }
  render = () => {
    return (
      <ArticleWrapper>
        <HeaderLarge pageTitle="Restore Lost Submission" />
        <ArticleSection>
          {composerContentStateBackup || composerHeaderStateBackup ? (
            <div>
              <p>
                If your submission has been lost, it may be revived from a
                back-up stored by the browser you used last to send it. The
                images that you have added to your submission will not be
                restored: you will need to upload them again.
              </p>
              <Button onClick={this.handleRestore}>
                <span role="img" aria-label="(Un)Locked button">
                  {this.state.allowOverwrite
                    ? TEXT_EMOJIS.UNLOCKED
                    : TEXT_EMOJIS.LOCKED}
                </span>{" "}
                Restore Lost Submission
              </Button>
            </div>
          ) : (
            <div>
              <p>
                Sorry, no backups were found were found on this browser. You may
                try another browser or device that you used to send your
                submission.
              </p>
            </div>
          )}
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RestoreComposerBackup)
