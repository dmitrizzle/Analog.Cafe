import { FrenchPress } from "@roast-cms/french-press-editor"
import { connect } from "react-redux"
import React from "react"

import { CARD_ERRORS } from "../../../../../constants/messages-submission"
import {
  Capital,
  Lower
} from "../../../../../../core/components/icons/HeaderGlyphs"
import { HOST_PROD } from "../../../../../../constants"
import { ToggleFeature } from "./plugins"
import { setCard } from "../../../../../../core/store/actions-modal"
import { setDraftStatus } from "../../../../../store/actions-composer"
import Picture from "../../../../../../core/components/vignettes/Picture_c"
import PictureDocket from "./components/PictureDocket"

// return
class ContentEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      connectionMessageShown: false
    }
  }
  editorRef = editor => {
    this.editor = editor
  }
  handleEditorError = error => {
    if (error === "insert_image") {
      this.props.setCard(
        {
          status: "ok",
          info: CARD_ERRORS.IMAGE_SIZE(10)
        },
        { url: "errors/upload" }
      )
    }
  }
  componentWillReceiveProps = nextProps => {
    // set focus on editor when user clicks inside the container component
    if (
      this.props.composer.editorFocusRequested <
      nextProps.composer.editorFocusRequested
    ) {
      this.editor.focus()
    }

    // show "offline" connection status message, once
    if (
      !this.state.connectionMessageShown &&
      nextProps.user.connection.status === "offline"
    ) {
      this.props.setCard(CARD_ERRORS.CONNECTION_OFFLINE)
      this.setState({ connectionMessageShown: true })
    }
  }
  render = () => {
    return (
      <FrenchPress
        //
        // components prop accepts three possible components: Picture,
        // PictureDocket, and ImageButton
        components={{
          Picture,
          PictureDocket
        }}
        //
        // this prop will call a function with a parameter that specifies
        // editor's localStorage save status (see above)
        callbackStatus={this.props.setDraftStatus}
        //
        // components within user controls; you may substitute them
        // for images, SVG animations, or whatever else you may fancy
        controls={{
          //
          // button that converts the text block into a header
          MakeHeader: () => <Capital />,
          //
          // button that converts header block back into paragraph
          CancelHeader: () => <Lower />,
          //
          // button that converts text block into a quote
          MakeQuote: () => <span>❝</span>,
          //
          // button that lets user add a link URL to selected text
          MakeLink: () => <u>link</u>,
          //
          // button that marks selected text as bold (and the reverse)
          MakeBold: () => <strong>bold</strong>,
          //
          // button that marks selected text as italic (and the reverse)
          MakeItalic: () => <em>italic</em>,
          //
          // button label for image upload control
          UploadImage: () => <span>↫ Add Image</span>
        }}
        //
        options={{
          //
          // domain prop helps rendering links better; for example, absolute
          // links like `domain.com/page` can be automatically converted into
          // `/page`
          domain: HOST_PROD
        }}
        //
        // this prop will call a function with error name and additional info
        // that you may like to display within your own dialogue box or interface;
        // i.e.: "Image is too large!"
        callbackError={this.handleEditorError}
        editorRef={this.editorRef}
        //
        // plugins specific for Analog.Cafe
        slatePlugins={[ToggleFeature({ key: "f", node: "image" })]}
      />
    )
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    setDraftStatus: status => {
      dispatch(setDraftStatus(status))
    }
  }
}
const mapStateToProps = state => {
  return {
    composer: state.composer,
    user: state.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentEditor)
