// tools
import React from "react"
import localForage from "localforage"
import uuidv1 from "uuid/v1"
import { froth } from "../../../../../../utils/image-froth"
import { forceImageRestrictions } from "../../../../../../utils/upload-utils"
import keycode from "keycode"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../../../actions/modalActions"
import { fetchCollabFeatures } from "../../../../../../actions/composerActions"

// components
import { CardHeader } from "../../../../../components/Card/styles"
import PictureDocket from "../../../../../components/_controls/PictureDocket"
import {
  GridContainer,
  GridRow,
  GridButton,
  GridButtonCaption,
  GridCaption,
  AspectRatio
} from "../../../../../components/_controls/PictureDocket/styles"
import { ModalDispatch } from "../../../../Modal"

// styles
import { dot } from "../../../../../components/_icons/BlankDot"

// constants
import { MESSAGE_HINT_IMAGE_COLLAB_FEATURES } from "../../../../../../constants/messages/hints"
import { ROUTE_AUTHOR_API } from "../../../../../../constants/author"
import errorMessages from "../../../../../../constants/messages/errors"
import { PICTURE_ACCEPTED_UPLOAD_MIME } from "../../../../../../constants/picture"

const GridButtonImage = props => {
  return (
    <GridButton
      onClick={() => (props.status === "ok" ? props.add(props.src) : null)}
    >
      <AspectRatio>
        <img
          src={
            froth({
              src: props.status === "ok" ? props.src : null,
              size: "t",
              crop: "square"
            }).src
          }
          alt="Editor’s suggestion"
          onDragStart={event => {
            event.preventDefault()
            event.stopPropagation()
          }}
        />
      </AspectRatio>
      {props.author && (
        <GridButtonCaption>
          <ModalDispatch
            with={{
              request: {
                url: ROUTE_AUTHOR_API + "/" + props.author.id
              }
            }}
          >
            {props.author.name}
          </ModalDispatch>
        </GridButtonCaption>
      )}
    </GridButton>
  )
}

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
    this.props.fetchCollabFeatures()
  }

  // image upload handlers
  initFileUpload = event => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    forceImageRestrictions(file.size, file.type)
      .then(() => this.uploadRequest(file))
      .catch(reason => {
        this.props.setCard(
          {
            status: "ok",
            info: errorMessages.VIEW_TEMPLATE.UPLOAD_IMAGE_SIZE(10)
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
          <ModalDispatch with={MESSAGE_HINT_IMAGE_COLLAB_FEATURES}>
            instant collaboration
          </ModalDispatch>{" "}
          or upload new image.
        </GridCaption>

        <GridContainer>
          <GridRow>
            {this.props.composer.collabFeatures.items.slice(0, 2).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  status={this.props.composer.collabFeatures.status}
                  author={
                    this.props.composer.collabFeatures.items[1]
                      ? item.author
                      : null
                  }
                  add={
                    this.props.composer.collabFeatures.items[1]
                      ? this.handleImageSuggestion
                      : null
                  }
                />
              )
            })}
            <GridButton onClick={this.initFileUpload} red>
              <div style={{ margin: "0 auto", paddingLeft: ".5em" }}>
                ＋
                <br />
                Upload<span> New</span>
              </div>
            </GridButton>
          </GridRow>
          <GridRow>
            {this.props.composer.collabFeatures.items.slice(2, 5).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  status={this.props.composer.collabFeatures.status}
                  author={item.author}
                  add={this.handleImageSuggestion}
                />
              )
            })}
          </GridRow>
          <GridRow>
            {this.props.composer.collabFeatures.items.slice(5, 8).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  status={this.props.composer.collabFeatures.status}
                  author={item.author}
                  add={this.handleImageSuggestion}
                />
              )
            })}
          </GridRow>
        </GridContainer>
        <input
          type="file"
          accept={PICTURE_ACCEPTED_UPLOAD_MIME.toString()}
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
    fetchCollabFeatures: () => {
      dispatch(fetchCollabFeatures())
    }
  }
}
const mapStateToProps = state => {
  return {
    composer: state.composer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  PictureDocketContainer
)
