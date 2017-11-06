// tools
import React from "react"
import localForage from "localforage"
import uuidv1 from "uuid/v1"
import { froth } from "../../../../../../utils/image-froth"
import { imageSizeLimit } from "../../../../../../utils/upload-utils"

// redux
import { connect } from "react-redux"
import { setCard } from "../../../../../../actions/modalActions"

// components
import PictureDocket from "../../../../../components/PictureDocket"
import { CardHeader } from "../../../../../components/Card/styles"
import {
  GridContainer,
  GridRow,
  GridButton,
  GridButtonCaption,
  GridCaption,
  AspectRatio
} from "../../../../../components/GridStyles"
import { ModalDispatch } from "../../../../Modal"

// styles
import { dot } from "../../../../../components/_icons/components/BlankDot"

// constants
import { MESSAGE_HINT_IMAGE_SUGGESTIONS } from "../../../../../../constants/messages/hints"
import { ROUTE_AUTHOR_API } from "../../../../../../constants/author"
import errorMessages from "../../../../../../constants/messages/errors"
const suggestions = [
  {
    id: "image-froth_658824_ry3-Wh3CZ",
    author: {
      name: "dmitrizzle",
      id: "dmitrizzle"
    }
  },
  {
    id: "image-froth_1546790_b5ff5d48edf8488387d39f64e18b2916",
    author: {
      name: "Betty",
      id: "betty"
    }
  },
  {
    id: "image-froth_623086_BkbGYohCW",
    author: {
      name: "dmitrizzle",
      id: "dmitrizzle"
    }
  },
  {
    id: "image-froth_664111_SynOy3n0b",
    author: {
      name: "dmitrizzle",
      id: "dmitrizzle"
    }
  },
  {
    id: "image-froth_1493506_B1u2qi3CZ",
    author: {
      name: "Betty",
      id: "betty"
    }
  },
  {
    id: "image-froth_660572_rkv4x2h0W",
    author: {
      name: "dmitrizzle",
      id: "dmitrizzle"
    }
  },
  {
    id: "image-froth_701295_Sy1L0ohAW",
    author: {
      name: "dmitrizzle",
      id: "dmitrizzle"
    }
  },
  {
    id: "image-froth_663121_HJILTj2RW",
    author: {
      name: "dmitrizzle",
      id: "dmitrizzle"
    }
  }
]

const GridButtonImage = props => {
  return (
    <GridButton onClick={() => props.add(props.src)}>
      <AspectRatio>
        <img
          src={
            froth({
              src: props.src,
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
    event.preventDefault()
    event.stopPropagation()

    const { node, editor } = this.props
    const resolvedState = editor.value
      .change()
      .insertBlock({ type: "paragraph" })
      .value.change()
      .removeNodeByKey(node.key)
    editor.onChange(resolvedState)

    // this helps refresh the view and update inserted image...
    // ...i don't know why
    // window.scrollBy(0, 1)
  }

  // image upload handlers
  initFileUpload = event => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    imageSizeLimit(file.size)
      .then(() => this.uploadRequest(file))
      .catch(reason => {
        this.props.setCard(
          {
            status: "ok",
            info: errorMessages.VIEW_TEMPLATE.UPLOAD_IMAGE_SIZE
          },
          { url: "errors/upload" }
        )
      })
  } // ⤵
  uploadRequest = file => {
    const { value, editor, node } = this.props
    const key = uuidv1()
    localForage.setItem(key, file)

    const resolvedState = value
      .change()
      .insertBlock({
        type: "image",
        isVoid: true,
        data: { file, key: key, src: dot }
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
      .value.change()
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
          <ModalDispatch with={MESSAGE_HINT_IMAGE_SUGGESTIONS}>
            instant collaboration
          </ModalDispatch>.
        </GridCaption>

        <GridContainer>
          <GridRow>
            {suggestions.slice(0, 2).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  author={item.author}
                  add={this.handleImageSuggestion}
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
            {suggestions.slice(2, 5).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  author={item.author}
                  add={this.handleImageSuggestion}
                />
              )
            })}
          </GridRow>
          <GridRow>
            {suggestions.slice(5, 8).map(item => {
              return (
                <GridButtonImage
                  key={item.id}
                  src={item.id}
                  author={item.author}
                  add={this.handleImageSuggestion}
                />
              )
            })}
          </GridRow>
        </GridContainer>
        <input
          type="file"
          accept="image/x-png,image/jpeg"
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
    }
  }
}
export default connect(null, mapDispatchToProps)(PictureDocketContainer)
