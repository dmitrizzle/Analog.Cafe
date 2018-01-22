// tools
import React from "react"
import { saveHeader } from "../../../../../utils/composer-saver"
import { loadHeader } from "../../../../../utils/composer-loader"
import keycode from "keycode"

// components
import TitleCase from "../../../TitleCase"
import { ModalDispatch } from "../../../Modal"
import Link from "../../../../components/_controls/Link"

// redux
import { connect } from "react-redux"
import { resetSubmissionStatus } from "../../../../../actions/composerActions"

// styles
import { Header, Byline } from "../../../../components/ArticleStyles"

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
    this.props.composerState.title = loadHeader().title
    this.props.composerState.subtitle = loadHeader().subtitle
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubtitleChange = this.handleSubtitleChange.bind(this)
  }
  componentWillMount = () => {
    this.headerData = loadHeader()
  }
  handleTitleChange = event => {
    this.props.composerState.title = event
    this.headerData.title = event
    saveHeader(this.headerData)

    // instead state management we're forcing update for all textfields
    // which in turn triggers `warning` and `caution` label re-calculation
    this.forceUpdate()
  }
  handleSubtitleChange = event => {
    this.props.composerState.subtitle = event
    this.headerData.subtitle = event
    saveHeader(this.headerData)

    //^^
    this.forceUpdate()
  }
  handleKeypress = event => {
    // disallow multiple lines in titles
    if (keycode(event.which) === "enter") event.preventDefault()
  }

  // unlink submission
  handleUnlinkSubmission = () => {
    this.props.resetSubmissionStatus()
  }
  render = () => {
    return (
      <Header>
        <TitleCase
          placeholder={this.props.pageTitle}
          onChange={this.handleTitleChange}
          value={this.headerData.title}
          inputDesignation="title"
          caution={this.headerData.title.length > TITLE_LENGTH_OPTIMAL}
          warning={this.headerData.title.length >= TITLE_LENGTH_MAX}
          maxLength={TITLE_LENGTH_MAX}
          autoFocus={this.headerData.title === ""}
          onKeyPress={this.handleKeypress}
        />
        <TitleCase
          placeholder={this.props.pageSubtitle}
          onChange={this.handleSubtitleChange}
          value={this.headerData.subtitle}
          inputDesignation="subtitle"
          caution={this.headerData.subtitle.length > SUBTITLE_LENGTH_OPTIMAL}
          warning={this.headerData.subtitle.length >= SUBTITLE_LENGTH_MAX}
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
              "published" && [
              <br />,
              <span>
                You are editing a published article. New submission will be
                created which (only editors can see) you will need to publish to
                replace the current article that’s live.
              </span>
            ]}
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderEditor)
