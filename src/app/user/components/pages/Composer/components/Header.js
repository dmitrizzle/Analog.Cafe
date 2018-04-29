import { connect } from "react-redux"
import React from "react"
import keycode from "keycode"

import { CARD_ALERTS } from "../../../../constants/messages-submission"
import {
  INPUT_SUBTITLE_LIMIT,
  INPUT_SUBTITLE_WARNING,
  INPUT_TITLE_LIMIT,
  INPUT_TITLE_WARNING
} from "../../../../constants/rules-submission"
import { resetStatus } from "../../../../../admin/store/actions-editor"
import { saveHeader } from "../../../../utils/actions-submission"
import { setComposerHeader } from "../../../../store/actions-composer"
import Byline from "../../../../../core/components/vignettes/Byline"
import HeaderWrapper from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper"
import Link from "../../../../../core/components/controls/Link"
import Modal from "../../../../../core/components/controls/Modal"
import TitleCase from "../../../forms/TitleCase"

// return
class HeaderEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubtitleChange = this.handleSubtitleChange.bind(this)
  }
  handleTitleChange = event => {
    const header = {
      title: event,
      subtitle: this.props.composer.header.subtitle
    }
    this.props.setComposerHeader(header)
    saveHeader(header)
  }
  handleSubtitleChange = event => {
    const header = {
      title: this.props.composer.header.title,
      subtitle: event
    }
    this.props.setComposerHeader(header)
    saveHeader(header)
  }
  handleKeypress = event => {
    // disallow multiple lines in titles
    if (keycode(event.which) === "enter") event.preventDefault()
  }

  // unlink submission
  handleUnlinkSubmission = event => {
    event.preventDefault()
    this.props.resetStatus()
  }
  render = () => {
    return (
      <HeaderWrapper>
        <TitleCase
          placeholder={this.props.pageTitle}
          onChange={this.handleTitleChange}
          value={this.props.composer.header.title}
          inputDesignation="title"
          caution={
            this.props.composer.header.title.length > INPUT_TITLE_WARNING
          }
          warning={this.props.composer.header.title.length >= INPUT_TITLE_LIMIT}
          maxLength={INPUT_TITLE_LIMIT}
          autoFocus={this.props.composer.header.title === ""}
          onKeyPress={this.handleKeypress}
        />
        <TitleCase
          placeholder={this.props.pageSubtitle}
          onChange={this.handleSubtitleChange}
          value={this.props.composer.header.subtitle}
          inputDesignation="subtitle"
          caution={
            this.props.composer.header.subtitle.length > INPUT_SUBTITLE_WARNING
          }
          warning={
            this.props.composer.header.subtitle.length >= INPUT_SUBTITLE_LIMIT
          }
          maxLength={INPUT_SUBTITLE_LIMIT}
          onKeyPress={this.handleKeypress}
        />
        {this.props.user.info.role === "admin" &&
        this.props.editor.status.id ? (
          <Byline>
            Submission under edit:{" "}
            <strong>{this.props.editor.status.id}</strong>{" "}
            <Link to="#unlink" onClick={this.handleUnlinkSubmission}>
              unlink
            </Link>.{this.props.editor.status.type === "published" ||
            this.props.editor.status.type === "scheduled"
              ? [
                  <br key="Byline_linebreak" />,
                  <span key="BYline_note">
                    You are editing a{" "}
                    <strong>{this.props.editor.status.type}</strong> article.{this
                      .props.editor.status.type === "published" &&
                      " You will need to publish your changes to update the publication."}
                  </span>
                ]
              : null}
          </Byline>
        ) : (
          <Byline>
            Link to <Modal with={CARD_ALERTS.YOUR_PROFILE}>Your Profile</Modal>{" "}
            will appear here.
          </Byline>
        )}
      </HeaderWrapper>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    composer: state.composer,
    editor: state.editor,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetStatus: () => {
      dispatch(resetStatus())
    },
    setComposerHeader: value => {
      dispatch(setComposerHeader(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderEditor)
