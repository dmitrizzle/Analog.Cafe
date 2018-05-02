import { connect } from "react-redux"
import React from "react"
import keycode from "keycode"

import {
  INPUT_SUBTITLE_LIMIT,
  INPUT_SUBTITLE_WARNING,
  INPUT_TITLE_LIMIT,
  INPUT_TITLE_WARNING
} from "../../../../constants/rules-submission"
import { resetStatus } from "../../../../../admin/store/actions-editor"
import { saveHeader } from "../../../../utils/actions-submission"
import { setComposerHeader } from "../../../../store/actions-composer"
import ComposerByline from "./ComposerByline"
import HeaderWrapper from "../../../../../core/components/vignettes/HeaderLarge/components/HeaderWrapper"
import TitleCase from "../../../forms/TitleCase"

class TitleCreator extends React.PureComponent {
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
    if (keycode(event.which) === "enter") event.preventDefault()
  }
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
        <ComposerByline
          user={this.props.user}
          editor={this.props.editor}
          unlinkSubmission={this.handleUnlinkSubmission}
        />
      </HeaderWrapper>
    )
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(TitleCreator)
