// tools
import React from "react"
import { saveHeader } from "../../helpers/saver"
import { loadHeader } from "../../helpers/loader"

// components
import TitleCase from "../../../TitleCase"
import { ModalDispatch } from "../../../Modal"

// styles
import { Header, Byline } from "../../../../components/ArticleStyles"
import placeholder from "../../../../components/_icons/images/placeholder-profile.png"

// constants
import {
  TITLE_LENGTH_MAX,
  TITLE_LENGTH_OPTIMAL,
  SUBTITLE_LENGTH_MAX,
  SUBTITLE_LENGTH_OPTIMAL
} from "../../../../../constants/input"

// return
export default class extends React.PureComponent {
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
          autoFocus
        />
        <TitleCase
          placeholder={this.props.pageSubtitle}
          onChange={this.handleSubtitleChange}
          value={this.headerData.subtitle}
          inputDesignation="subtitle"
          caution={this.headerData.subtitle.length > SUBTITLE_LENGTH_OPTIMAL}
          warning={this.headerData.subtitle.length >= SUBTITLE_LENGTH_MAX}
          maxLength={SUBTITLE_LENGTH_MAX}
        />
        <Byline>
          Link to{" "}
          <ModalDispatch
            with={{
              info: {
                image: placeholder,
                title: "Your Profile",
                text:
                  "You can create, view or update your profile after you send your submission."
              },
              id: "hints/author"
            }}
          >
            Your Profile
          </ModalDispatch>{" "}
          will appear here.
        </Byline>
      </Header>
    )
  }
}
