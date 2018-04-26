import { connect } from "react-redux"
import React from "react"
import keycode from "keycode"

import {
  Byline,
  Header
} from "../../../../../../core/components/styles/ArticleStyles"
import { CARD_ALERTS } from "../../../../../constants/messages-submission"
import {
  INPUT_SUBTITLE_LIMIT,
  INPUT_SUBTITLE_WARNING,
  INPUT_TITLE_LIMIT,
  INPUT_TITLE_WARNING
} from "../../../../../constants/rules-submission"
import { ModalDispatch } from "../../../../../../core/components/controls/Modal"
import { resetstatus } from "../../../../../store/actions-submission"
import { saveHeader } from "../../../../../utils/actions-submission"
import { setComposerHeader } from "../../../../../store/actions-composer"
import Link from "../../../../../../core/components/controls/Link"
import TitleCase from "../../../../forms/TitleCase"

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
    this.props.resetstatus()
  }
  render = () => {
    return (
      <Header>
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
        this.props.submission.status.id ? (
          <Byline>
            Submission under edit:{" "}
            <strong>{this.props.submission.status.id}</strong>{" "}
            <Link to="#unlink" onClick={this.handleUnlinkSubmission}>
              unlink
            </Link>.{this.props.submission.status.type === "published" ||
            this.props.submission.status.type === "scheduled"
              ? [
                  <br key="Byline_linebreak" />,
                  <span key="BYline_note">
                    You are editing a{" "}
                    <strong>{this.props.submission.status.type}</strong>{" "}
                    article.{this.props.submission.status.type ===
                      "published" &&
                      " You will need to publish your changes to update the publication."}
                  </span>
                ]
              : null}
          </Byline>
        ) : (
          <Byline>
            Link to{" "}
            <ModalDispatch with={CARD_ALERTS.YOUR_PROFILE}>
              Your Profile
            </ModalDispatch>{" "}
            will appear here.
          </Byline>
        )}
      </Header>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    composer: state.composer,
    submission: state.submission,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetstatus: () => {
      dispatch(resetstatus())
    },
    setComposerHeader: value => {
      dispatch(setComposerHeader(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderEditor)
