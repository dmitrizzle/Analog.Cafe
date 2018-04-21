// tools
import { connect } from "react-redux"
import React from "react"

import { INPUT_AUTO_FORMAT } from "../../../../user/constants/input"
import { PICTURE_DATA_OBJECT } from "../../../constants/picture"
import { PlainTextarea } from "../../stateless/_controls/InputStyles"
import { getFroth } from "../../../utils/image-froth"
import { getInfo } from "../../../store/actions/pictureActions"
import Picture from "../../stateless/Picture"
import PictureMenu from "../../../../user/components/pages/Composer/components/ContentEditor/components/PictureMenu"

// export
// let localForageCache
class Figure extends React.PureComponent {
  // state for caption & selection
  constructor(props) {
    super(props)
    this.state = {
      caption: props.node.data.get("caption"),
      src: props.node.data.get("src") || "",
      key: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleTextareaClick = this.handleTextareaClick.bind(this)
    this.handleRemovePicture = this.handleRemovePicture.bind(this)
    this.handleFeaturePicture = this.handleFeaturePicture.bind(this)
  }

  // listeners
  componentWillReceiveProps = nextProps => {
    const caption = nextProps.node.data.get("caption")
    if (caption !== this.state.caption) {
      this.setState({ caption })
    }
  }
  handleChange = event => {
    // preserve caret position
    const caret = event.target.selectionStart
    const element = event.target
    window.requestAnimationFrame(() => {
      element.selectionStart = caret
      element.selectionEnd = caret
    })

    // format caption text
    let caption = INPUT_AUTO_FORMAT(element.value)
    const { node, editor } = this.props
    const feature = node.data.get("feature")
    const src = node.data.get("src")
    const key = node.data.get("key") || false
    const file = node.data.get("file") || false
    const properties = { data: { caption, src, feature, key, file } }

    const resolvedState = editor.value
      .change()
      .setNodeByKey(node.key, properties)
    editor.onChange(resolvedState)

    // store DB key if available
    this.setState({ key })
  }
  handleTextareaClick = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  // init
  componentDidMount = () => {
    const { node } = this.props
    const { data } = node
    const caption = data.get("caption")
    const key = data.get("key")
    this.setState({ caption })
    this.loadImage(data.get("file"), key, data.get("src"))

    // store DB key if available
    this.setState({ key })
  }
  loadImage = (file, key, src) => {
    if (!key) {
      this.setState({ src })
      // get image author
      this.props.readOnly && this.props.getInfo(src)
    } else {
      import("localforage").then(localForage => {
        // localForageCache = localForage
        localForage.getItem(key).then(data => {
          const reader = new FileReader()
          reader.addEventListener("load", () =>
            this.setState({ src: reader.result })
          )
          if (
            data &&
            Object.keys(file).length === 0 &&
            file.constructor === Object
          ) {
            reader.readAsDataURL(data)
          } else if (file && file.constructor !== Object) {
            reader.readAsDataURL(file)
          }
        })
      })

      // store DB key if available
      this.setState({ key })
    }
  }

  handleRemovePicture = () => {
    const { node, editor } = this.props
    if (!editor.value.document.getDescendant(node.key)) return
    editor.onChange(editor.value.change().removeNodeByKey(node.key))
  }
  handleFeaturePicture = () => {
    const { node, editor } = this.props
    const previousData = PICTURE_DATA_OBJECT(
      editor.value.document.getChild(node.key).data
    )
    let featureStatus = previousData.feature ? false : true
    editor.onChange(
      editor.value
        .change()
        .setNodeByKey(node.key, {
          type: "image",
          data: { ...previousData, feature: featureStatus }
        })
        .focus()
    )
  }

  render = () => {
    const { attributes, node, isSelected, editor } = this.props
    const { src } = this.state
    const focus = editor.value.isFocused && isSelected
    const className = focus ? "focus" : "nofocus"
    const feature = node.data.get("feature")

    return (
      <div style={{ clear: "both" }}>
        {!this.props.readOnly && focus ? (
          <PictureMenu
            removePicture={this.handleRemovePicture}
            featurePicture={this.handleFeaturePicture}
          />
        ) : null}
        <Picture
          {...attributes}
          readOnly={this.props.readOnly}
          src={src}
          className={className}
          author={
            this.props.pictures[getFroth(src)] &&
            this.props.pictures[getFroth(src)].info.author
          }
          composer={!this.props.readOnly}
          feature={feature}
        >
          {!this.props.readOnly ? (
            <PlainTextarea
              value={this.state.caption}
              placeholder="Add image title, location, camera, film&hellip;"
              onChange={this.handleChange}
              onClick={this.handleTextareaClick}
            />
          ) : (
            <span>{this.state.caption}</span>
          )}
        </Picture>
      </div>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    pictures: state.pictures
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getInfo: src => {
      dispatch(getInfo(src))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Figure)
