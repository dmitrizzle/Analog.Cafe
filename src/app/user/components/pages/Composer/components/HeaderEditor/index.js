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
import {
  resetSubmissionStatus,
  setHeadingValues
} from "../../../../../store/actions-submission"
import { saveHeader } from "../../../../../utils/actions-submission"
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
    const headingValues = {
      title: event,
      subtitle: this.props.composer.headingValues.subtitle
    }
    this.props.setHeadingValues(headingValues)
    saveHeader(headingValues)
  }
  handleSubtitleChange = event => {
    const headingValues = {
      title: this.props.composer.headingValues.title,
      subtitle: event
    }
    this.props.setHeadingValues(headingValues)
    saveHeader(headingValues)
  }
  handleKeypress = event => {
    // disallow multiple lines in titles
    if (keycode(event.which) === "enter") event.preventDefault()
  }

  // unlink submission
  handleUnlinkSubmission = event => {
    event.preventDefault()
    this.props.resetSubmissionStatus()
  }
  render = () => {
    return (
      <Header>
        <TitleCase
          placeholder={this.props.pageTitle}
          onChange={this.handleTitleChange}
          value={this.props.composer.headingValues.title}
          inputDesignation="title"
          caution={
            this.props.composer.headingValues.title.length > INPUT_TITLE_WARNING
          }
          warning={
            this.props.composer.headingValues.title.length >= INPUT_TITLE_LIMIT
          }
          maxLength={INPUT_TITLE_LIMIT}
          autoFocus={this.props.composer.headingValues.title === ""}
          onKeyPress={this.handleKeypress}
        />
        <TitleCase
          placeholder={this.props.pageSubtitle}
          onChange={this.handleSubtitleChange}
          value={this.props.composer.headingValues.subtitle}
          inputDesignation="subtitle"
          caution={
            this.props.composer.headingValues.subtitle.length >
            INPUT_SUBTITLE_WARNING
          }
          warning={
            this.props.composer.headingValues.subtitle.length >=
            INPUT_SUBTITLE_LIMIT
          }
          maxLength={INPUT_SUBTITLE_LIMIT}
          onKeyPress={this.handleKeypress}
        />
        {this.props.user.info.role === "admin" &&
        this.props.composer.submissionStatus.id ? (
          <Byline>
            Submission under edit:{" "}
            <strong>{this.props.composer.submissionStatus.id}</strong>{" "}
            <Link to="#unlink" onClick={this.handleUnlinkSubmission}>
              unlink
            </Link>.{this.props.composer.submissionStatus.type ===
              "published" ||
            this.props.composer.submissionStatus.type === "scheduled"
              ? [
                  <br key="Byline_linebreak" />,
                  <span key="BYline_note">
                    You are editing a{" "}
                    <strong>{this.props.composer.submissionStatus.type}</strong>{" "}
                    article.{this.props.composer.submissionStatus.type ===
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
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetSubmissionStatus: () => {
      dispatch(resetSubmissionStatus())
    },
    setHeadingValues: value => {
      dispatch(setHeadingValues(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderEditor)
