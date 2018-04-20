// tools
import React from "react"
import { saveHeader } from "../../../../../utils/browser-storage"
import keycode from "keycode"

// components
import TitleCase from "../../../TitleCase"
import { ModalDispatch } from "../../../Modal"
import Link from "../../../../stateless/_controls/Link"

// redux
import { connect } from "react-redux"
import {
  resetSubmissionStatus,
  setHeadingValues
} from "../../../../../store/actions/composerActions"

// styles
import { Header, Byline } from "../../../../stateless/ArticleStyles"

// constants
import {
  TITLE_LENGTH_MAX,
  TITLE_LENGTH_OPTIMAL,
  SUBTITLE_LENGTH_MAX,
  SUBTITLE_LENGTH_OPTIMAL
} from "../../../../../constants/input"
import { MESSAGE_HINT_YOUR_PROFILE } from "../../../../../constants/messages/hints"

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
            this.props.composer.headingValues.title.length >
            TITLE_LENGTH_OPTIMAL
          }
          warning={
            this.props.composer.headingValues.title.length >= TITLE_LENGTH_MAX
          }
          maxLength={TITLE_LENGTH_MAX}
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
            SUBTITLE_LENGTH_OPTIMAL
          }
          warning={
            this.props.composer.headingValues.subtitle.length >=
            SUBTITLE_LENGTH_MAX
          }
          maxLength={SUBTITLE_LENGTH_MAX}
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
            <ModalDispatch with={MESSAGE_HINT_YOUR_PROFILE}>
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
