// tools
import React from "react"
import { Editor } from "slate-react"
import { State } from "slate"
import getOffsets from "positions"

// components
import ImageButton from "./components/ImageButton"

// helpers, plugins & schema
// import { plugins } from "./plugins"
import { schema } from "./schema"
import { loadContent } from "../../../../../utils/composer-loader"
import {
  saveContent,
  setDraftStatusHelper
} from "../../../../../utils/composer-saver"

// return
export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.props.composerState.raw = loadContent()

    // composerState is what appears by default in composer once the user opens the view
    this.state = {
      state: State.fromJSON(loadContent()),
      schema,
      author: this.props.author,
      cursorContext: {
        isFocused: false,
        newLine: false,
        parentBlockOffsets: { top: 0, left: 0 }
      }
    }
  }

  handleChange = ({ state }) => {
    this.setState({ state })

    // add information about cursor positions
    setTimeout(
      function() {
        // const block = findDOMNode(state.document.getDescendant(state.focusBlock.key))
        // findDOMNode returns error every time; instead we just need it to exit the function vv
        const nodeKey = state.focusBlock.key
        const block = window.document.querySelector(`[data-key="${nodeKey}"]`)
        if (!block) return

        const cursorContext = {
          firstEmptyLine:
            state.document.isEmpty && state.document.nodes.size === 1,
          newLine: state.focusBlock.isEmpty,
          parentBlockOffsets: getOffsets(block, "top left", block, "top left"),
          isFocused: this.state.cursorContext.isFocused
        }
        this.setState({ cursorContext })
      }.bind(this),
      300
    )

    // update draft status & save content to device
    setDraftStatusHelper()
    this.props.composerState.raw = JSON.stringify(state.toJSON())
    saveContent(document, state)
  }

  // image button handler:
  handleImageButton = event => {
    if (!event) return
    event.preventDefault()
    event.stopPropagation()

    const activeBlockKey = this.state.state.focusBlock.key
    const resolvedState = this.state.state
      .change()
      .insertBlock({
        type: "docket",
        isVoid: true
      })
      .state.change()
      .removeNodeByKey(activeBlockKey)
    this.setState({
      state: resolvedState.state,
      cursorContext: { ...this.state.cursorContext, newLine: false }
    })
  }

  // render
  render = () => {
    return (
      <div style={{ position: "relative" }}>
        <ImageButton
          cursorContext={this.state.cursorContext}
          onClick={this.handleImageButton}
        />
        <Editor
          // plugins={plugins}
          schema={this.state.schema}
          state={this.state.state}
          onChange={this.handleChange}
          style={{ minHeight: "28em" }}
        />
      </div>
    )
  }
}
