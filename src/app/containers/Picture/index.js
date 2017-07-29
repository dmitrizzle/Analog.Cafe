// tools
import React from "react"
import { imageSrcToPictureId } from "./helpers"

// redux
import { connect } from "react-redux"
import { getInfo } from "../../../actions/pictureActions"

// components
import Picture from "../../components/Picture"
import { PlainTextarea } from "../../components/InputText"

// export
class Figure extends React.Component {
	// state for caption & selection
	constructor(props) {
    super(props)
    this.state = { caption: props.node.data.get("caption") }
		this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
	componentWillReceiveProps(nextProps) {
    const caption = nextProps.node.data.get("caption");
    if (caption !== this.state.caption) {
      this.setState({ caption })
    }
  }
  handleChange(event) {
    const caption = event.target.value
    const { node, editor } = this.props
		const feature = node.data.get("feature")
    const src = node.data.get("src")
    const properties = {data: { caption, src, feature }}
    const next = editor
      .getState()
      .transform()
      .setNodeByKey(node.key, properties)
      .apply()
		editor.onChange(next) // have to use native onChange in editor (rather than handleChange)
  }
  handleClick(event) {
  	event.preventDefault()
    event.stopPropagation()
  }
  componentDidMount() {
    const { node } = this.props
    const { data } = node
		const caption = data.get("caption")
		this.setState({ caption })
    this.loadImage(data.get("file"), data.get("src"))
  }
  loadImage(file, src) {
  	if(!file || !file.name){
  		this.setState({ src })

			// get image author
			this.props.readOnly && this.props.getInfo(src)
  	}
  	else {
			const reader = new FileReader()
			reader.addEventListener("load", () => this.setState({ src: reader.result }))
			reader.readAsDataURL(file)
		}
  }
  render() {
    const { attributes, state, node } = this.props
    const { src } = this.state
    const focus = state.isFocused && state.selection.hasEdgeIn(node)
		const className = focus ? "focus" : "nofocus"
		const feature = node.data.get("feature")

    return src
      ? <Picture
      		{ ...attributes }
					readOnly={ this.props.readOnly }
      		src={ src }
      		className={ className }
      		author={ this.props.pictures[imageSrcToPictureId(src)] && this.props.pictures[imageSrcToPictureId(src)].info.author }
      		composer={ !this.props.readOnly }
					feature={ feature }
      	>
      		{ !this.props.readOnly
						? <PlainTextarea
							value={ this.state.caption }
							placeholder="Add image title, location, camera, film&hellip;"
							onChange={ this.handleChange }
							onClick={ this.handleClick }
						/>
						: <div>{ this.state.caption }{ this.state.caption && <br />}</div>
					}
      	</Picture>
      : <Picture { ...attributes } src="" className={ className }>Loading image...</Picture>
  }
}

// connet with redux
const mapStateToProps = state => {
	return {
    pictures: state.pictures,
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
