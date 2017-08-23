// tools
import React from "react"
import { Editor, Raw } from "slate"
import getOffsets from "positions"
import { withRouter } from "react-router"

// components
import ImageButton from "./components/ImageButton"
import { ModalDispatch } from "../../../../containers/Modal"
import { fetchCard, setCard } from "../../../../../actions/modalActions"

// helpers, plugins & schema
import { plugins } from "./plugins"
import { schema } from "./schema"
import { loadContent } from "../../helpers/loader"
import { saveContent, setDraftStatusHelper } from "../../helpers/saver"


// return
class ContentEditor extends React.Component {
	state = {
		state: Raw.deserialize(loadContent(), { terse: true }),
		schema,
		author: this.props.author,
		cursorContext: {
			isFocused: false,
			newLine: false,
			parentBlockOffsets: { top: 0, left: 0 }
		}
	}

	constructor(props) {
    super(props)

		// what is `this.props.requestData.raw`? Write a comment explaining what this does.
		this.props.requestData.raw = loadContent()
  }

	handleChange = state => {
		this.setState({ state: state })

		// add information about cursor positions
		setTimeout((function(){
			// const block = findDOMNode(state.document.getDescendant(state.focusBlock.key))
			// findDOMNode returns error every time; instead we just need it to exit the function vv
			const nodeKey = state.focusBlock.key
			const block = window.document.querySelector(`[data-key="${nodeKey}"]`)
			if(!block) return

			const cursorContext = {
				firstEmptyLine:				state.document.isEmpty && state.document.nodes.size === 1,
				newLine:  						state.focusBlock.isEmpty,
				parentBlockOffsets:   getOffsets(block, "top left", block, "top left"),
				isFocused: 						this.state.cursorContext.isFocused,
			}
			this.setState({ cursorContext })
		}).bind(this), 300)
	}

	// content saver
  handleDocumentChange = (document, state) => {
		setDraftStatusHelper()
		this.props.requestData.raw = JSON.stringify(Raw.serialize(state))
		saveContent(document, state)
	}

	// image button handler:
	handleImageButton = e => {
    e.preventDefault()
    e.stopPropagation()
		if(localStorage.getItem('token')) {
			const resolvedState = this.state.state
				.transform()
				.insertBlock({
					type: "docket",
					isVoid: true
				})
				.apply()
			this.setState({
				state: resolvedState,
				cursorContext: { ...this.state.cursorContext, newLine: false	}
			})
			saveContent(this.state.state.document, resolvedState)
		}
  }

	// render
	render() {
		return (
			<div style={						{ position: "relative" }}>
        <ImageButton
					cursorContext={ 		this.state.cursorContext }
					onClick={ 					this.handleImageButton }
        />
				<Editor
					plugins={						plugins }
					schema={						this.state.schema }
					state={							this.state.state }

					onChange={					this.handleChange }
					onDocumentChange={	this.handleDocumentChange }

					author={						this.state.author	}
					style={							{ minHeight: "28em" }}
				/>
      </div>
		)
	}
}

export default withRouter(ContentEditor)
