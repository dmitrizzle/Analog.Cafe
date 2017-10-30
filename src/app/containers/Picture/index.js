// tools
import React from "react"
import { getFroth } from "../../../utils/image-froth"
import localForage from "localforage"

// redux
import { connect } from "react-redux"
import { getInfo } from "../../../actions/pictureActions"

// components
import Picture from "../../components/Picture"
import { PlainTextarea } from "../../components/InputStyles"

// export
// this doesn't work as well with PureComponent:
// author links need to be clicked twice after first load to work...
class Figure extends React.Component {
  // state for caption & selection
  constructor(props) {
    super(props)
    this.state = { caption: props.node.data.get("caption") }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillReceiveProps = nextProps => {
    const caption = nextProps.node.data.get("caption")
    if (caption !== this.state.caption) {
      this.setState({ caption })
    }
  }
  handleChange = event => {
    // format caption text
    let caption = event.target.value
      .replace(/'\b/g, "‘") // opening singles
      .replace(/\b'/g, "’") // closing singles
      .replace(/"\b/g, "“") // opening doubles
      .replace(/\b"/g, "”") // closing doubles
      .replace(/--/g, "—") // em-dashes
      .replace(/\b\.\.\./g, "…") // ellipsis
    const { node, editor, value } = this.props
    const feature = node.data.get("feature")
    const src = node.data.get("src")
    const key = node.data.get("key") || false
    const file = node.data.get("file") || false
    const properties = { data: { caption, src, feature, key, file } }

    const resolvedState = value.change().setNodeByKey(node.key, properties)
    editor.onChange(resolvedState) // have to use native onChange in editor (rather than handleChange)
  }
  handleClick = event => {
    event.preventDefault()
    event.stopPropagation()
  }
  componentDidMount = () => {
    const { node } = this.props
    const { data } = node
    const caption = data.get("caption")
    this.setState({ caption })
    this.loadImage(data.get("file"), data.get("key"), data.get("src"))
  }
  loadImage = (file, key, src) => {
    if (!key) {
      this.setState({ src })
      // get image author
      this.props.readOnly && this.props.getInfo(src)
    } else {
      localForage.getItem(key).then(data => {
        const reader = new FileReader()
        reader.addEventListener("load", () =>
          this.setState({ src: reader.result })
        )
        if (Object.keys(file).length === 0 && file.constructor === Object) {
          reader.readAsDataURL(data)
        } else {
          reader.readAsDataURL(file)
        }
      })
    }
  }

  render = () => {
    const { attributes, node, isSelected, editor } = this.props
    const { src } = this.state
    const focus = editor.value.isFocused && isSelected
    const className = focus ? "focus" : "nofocus"
    const feature = node.data.get("feature")

    return src ? (
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
            onClick={this.handleClick}
          />
        ) : (
          <span>{this.state.caption}</span>
        )}
      </Picture>
    ) : (
      <Picture {...attributes} src="" className={className}>
        Loading image…
      </Picture>
    )
  }
}

// connet with redux
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
