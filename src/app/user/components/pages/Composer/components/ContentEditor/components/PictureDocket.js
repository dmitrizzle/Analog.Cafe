import { connect } from "react-redux"
import React from "react"
import keycode from "keycode"
import localForage from "localforage"
import uuidv1 from "uuid/v1"

import {
  CARD_ALERTS,
  CARD_ERRORS
} from "../../../../../../constants/messages-submission"
import { CardHeader } from "../../../../../../../core/components/controls/Card/styles"
import {
  GridButton,
  GridButtonImage,
  GridCaption,
  GridContainer,
  GridRow
} from "../../../../../controls/Grid"
import { MIME_PICTURES } from "../../../../../../constants/rules-submission"
import { ModalDispatch } from "../../../../../../../core/components/controls/Modal"
import { dot } from "../../../../../../../core/components/icons/BlankDot"
import { fetchImageLib } from "../../../../../../store/actions-imagelib"
import { forceImageRestrictions } from "../../../../../../utils/actions-submission"
import { setCard } from "../../../../../../../core/store/actions-modal"
import PictureDocket from "../../../../../controls/PictureDocket"

// return
class PictureDocketContainer extends React.PureComponent {
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

    // the event listener for Esc key will remain, however this node will be gone
    // so we check if it exists first
    if (!editor.value.document.getNode(node.key)) return

    const resolvedState = editor.value
      .change({ save: false })
      .insertBlock({ type: "paragraph" })
      .value.change()
      .focus()
      .value.change({ save: false })
      .removeNodeByKey(node.key)
    editor.onChange(resolvedState)

    // this helps refresh the view and update inserted image...
    // ...i don't know why
    // window.scrollBy(0, 1)
  }

  componentDidMount = () => {
    document.addEventListener("keydown", event => {
      if (keycode(event) !== "esc") return
      this.handleClose(event)
    })

    // get featured collab images
    this.props.fetchImageLib()
  }

  // image upload handlers
  initFileUpload = () => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    forceImageRestrictions(file.size, file.type)
      .then(() => this.uploadRequest(file))
      .catch(() => {
        this.props.setCard(
          {
            status: "ok",
            info: CARD_ERRORS.IMAGE_SIZE(10)
          },
          { url: "errors/upload" }
        )
      })
  } // ⤵
  uploadRequest = file => {
    const { editor, node } = this.props
    const key = uuidv1()
    localForage.setItem(key, file)

    const resolvedState = editor.value
      .change()
      .insertBlock({
        type: "image",
        isVoid: true,
        data: { file, key, src: dot }
      })
      // remove docket
      .value.change()
      .removeNodeByKey(node.key)
    window.requestAnimationFrame(() => {
      editor.onChange(resolvedState)
    })
  }

  // insert selected image suggesstion:
  handleImageSuggestion = src => {
    const { editor, node } = this.props
    const resolvedState = editor.value
      .change()
      .insertBlock({
        type: "image",
        isVoid: true,
        data: { src }
      })
      // remove docket
      .value.change({ save: false })
      .removeNodeByKey(node.key)
    window.requestAnimationFrame(() => {
      editor.onChange(resolvedState)
    })
  }

  render = () => {
    return (
      <PictureDocket>
        <CardHeader>
          <h3 style={{ paddingTop: ".25em" }}>Add an image:</h3>
          <a href="#close" onClick={this.handleClose.bind(this)}>
            ✕
          </a>
        </CardHeader>
        <GridCaption>
          Create an{" "}
          <ModalDispatch with={CARD_ALERTS.COLLABORATIONS}>
            instant collaboration
          </ModalDispatch>{" "}
          or upload new image.
        </GridCaption>

        <GridContainer>
          <GridRow>
            {this.props.imagelib.items.slice(0, 2).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  status={this.props.imagelib.status}
                  author={this.props.imagelib.items[1] ? item.author : null}
                  add={
                    this.props.imagelib.items[1]
                      ? this.handleImageSuggestion
                      : null
                  }
                />
              )
            })}
            <GridButton onClick={this.initFileUpload} branded>
              <div style={{ margin: "0 auto", paddingLeft: ".5em" }}>
                ＋
                <br />
                Upload<span> New</span>
              </div>
            </GridButton>
          </GridRow>
          <GridRow>
            {this.props.imagelib.items.slice(2, 5).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  status={this.props.imagelib.status}
                  author={item.author}
                  add={this.handleImageSuggestion}
                />
              )
            })}
          </GridRow>
          <GridRow>
            {this.props.imagelib.items.slice(5, 8).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  status={this.props.imagelib.status}
                  author={item.author}
                  add={this.handleImageSuggestion}
                />
              )
            })}
          </GridRow>
        </GridContainer>
        <input
          type="file"
          accept={MIME_PICTURES.toString()}
          style={{ display: "none" }}
          ref={input => {
            this.fileInput = input
          }}
          onChange={this.handleFileUpload}
        />
      </PictureDocket>
    )
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    setCard: (info, request) => {
      dispatch(setCard(info, request))
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
export default connect(mapStateToProps, mapDispatchToProps)(
  PictureDocketContainer
)
