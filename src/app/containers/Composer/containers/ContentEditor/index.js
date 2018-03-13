// tools
import React from "react"
import { FrenchPress } from "@roast-cms/french-press-editor"

import Picture from "../../../Picture"
import PictureDocket from "./containers/PictureDocket"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../../actions/modalActions"
import { setDraftStatus } from "../../../../../actions/composerActions"
// import { MESSAGE_HINT_CONNECTION_OFFLINE } from "../../../../../constants/messages/hints"

import { Capital, Lower } from "../../../../components/_icons/HeaderGlyphs"

// return
const ContentEditor = props => {
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
      callbackStatus={props.setDraftStatus}
      //
      // render components within user controls; you may substitute them
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
    />
  )
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
