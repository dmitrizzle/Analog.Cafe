// tools
import React from "react"
import { FrenchPress } from "@roast-cms/french-press-editor"

import Picture from "../../../Picture"
import PictureDocket from "./containers/PictureDocket"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../../actions/modalActions"
import { setDraftStatus } from "../../../../../actions/composerActions"
import { MESSAGE_HINT_CONNECTION_OFFLINE } from "../../../../../constants/messages/hints"

import { ROUTE_APP_PRODUCTION_DOMAIN_NAME } from "../../../../../constants/app"

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
      //
      options={{
        //
        // domain prop helps rendering links better; for example, absolute
        // links like `domain.com/page` can be automatically converted into
        // `/page`
        domain: ROUTE_APP_PRODUCTION_DOMAIN_NAME
      }}
      //
      // this prop will call a function with error name and additional info
      // that you may like to display within your own dialogue box or interface;
      // i.e.: "Image is too large!"
      callbackError={(error, reason) => {
        console.log(error, reason)
      }}
      editorRef={editorRef => {
        // manage
        // if (
        //   props.composer.editorFocusRequested <
        //   nextProps.composer.editorFocusRequested
        // ) {
        //   this.slateEditor.focus()
        // }
        // if (
        //   !this.state.connectionMessageShown &&
        //   nextProps.user.connection.status === "offline"
        // ) {
        //   props.setCard(MESSAGE_HINT_CONNECTION_OFFLINE)
        //   _this.setState({ connectionMessageShown: true })
        // }
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
