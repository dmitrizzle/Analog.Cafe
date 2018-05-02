import { connect } from "react-redux"
import React from "react"
import keycode from "keycode"
import localForage from "localforage"
import uuidv1 from "uuid/v1"

import {
  CARD_ALERTS,
  CARD_ERRORS
} from "../../../constants/messages-submission"
import { DOCUMENT_BLANK_DOT } from "../../../../constants"
import { MIME_PICTURES } from "../../../constants/rules-submission"
import { fetchImageLib } from "../../../store/actions-imagelib"
import { forceImageRestrictions } from "../../../utils/actions-submission"
import { setModal } from "../../../../core/store/actions-modal"
import GridCaption from "../Grid/components/GridCaption"
import HeaderSmall from "../../../../core/components/vignettes/HeaderSmall"
import ImageGrid from "./components/ImageGrid"
import Modal from "../../../../core/components/controls/Modal"
import ScreenSlicer from "./components/ScreenSlicer"

class PictureDocket extends React.PureComponent {
  constructor(props) {
    super(props)
    this.uploadRequest = this.uploadRequest.bind(this)
    this.initFileUpload = this.initFileUpload.bind(this)
  }
  handleClose = event => {
    if (!event) return
    if (event !== "keyboard") {
      event.preventDefault()
      event.stopPropagation()
    }
    const { node, editor } = this.props
    if (!editor.value.document.getNode(node.key)) return
    const resolvedState = editor.value
      .change({ save: false })
      .insertBlock({ type: "paragraph" })
      .value.change()
      .focus()
      .value.change({ save: false })
      .removeNodeByKey(node.key)
    editor.onChange(resolvedState)
  }
  componentDidMount = () => {
    document.addEventListener("keydown", event => {
      if (keycode(event) !== "esc") return
      this.handleClose(event)
    })
    this.props.fetchImageLib()
  }
  initFileUpload = () => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    forceImageRestrictions(file.size, file.type)
      .then(() => this.uploadRequest(file))
      .catch(() => {
        this.props.setModal(
          {
            status: "ok",
            info: CARD_ERRORS.IMAGE_SIZE(10)
          },
          { url: "errors/upload" }
        )
      })
  }
  uploadRequest = file => {
    const { editor, node } = this.props
    const key = uuidv1()
    localForage.setItem(key, file)
    const resolvedState = editor.value
      .change()
      .insertBlock({
        type: "image",
        isVoid: true,
        data: { file, key, src: DOCUMENT_BLANK_DOT }
      })
      .value.change()
      .removeNodeByKey(node.key)
    window.requestAnimationFrame(() => {
      editor.onChange(resolvedState)
    })
  }
  handleImageSuggestion = src => {
    const { editor, node } = this.props
    const resolvedState = editor.value
      .change()
      .insertBlock({
        type: "image",
        isVoid: true,
        data: { src }
      })
      .value.change({ save: false })
      .removeNodeByKey(node.key)
    window.requestAnimationFrame(() => {
      editor.onChange(resolvedState)
    })
  }
  render = () => {
    return (
      <ScreenSlicer>
        <aside>
          <HeaderSmall>
            <h3 style={{ paddingTop: ".25em" }}>Add an image:</h3>
            <a href="#close" onClick={this.handleClose.bind(this)}>
              ✕
            </a>
          </HeaderSmall>
          <GridCaption>
            Create an{" "}
            <Modal with={CARD_ALERTS.COLLABORATIONS}>
              instant collaboration
            </Modal>{" "}
            or upload new image.
          </GridCaption>
          <ImageGrid
            imagelib={this.props.imagelib}
            imageSuggestion={this.handleImageSuggestion}
            initFileUpload={this.initFileUpload}
          />
          <input
            type="file"
            accept={MIME_PICTURES.toString()}
            style={{ display: "none" }}
            ref={input => {
              this.fileInput = input
            }}
            onChange={this.handleFileUpload}
          />
        </aside>
      </ScreenSlicer>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    },
    fetchImageLib: () => {
      dispatch(fetchImageLib())
    }
  }
}
const mapStateToProps = state => {
  return {
    imagelib: state.imagelib
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PictureDocket)
