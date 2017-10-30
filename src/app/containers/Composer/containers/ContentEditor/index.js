// tools
import React from "react"
import { Editor } from "slate-react"
import { Value } from "slate"
import getOffsets from "positions"

// components
import ImageButton from "./components/ImageButton"

// helpers, plugins & schema
import { plugins } from "./plugins"
import { renderNode, renderMark } from "./render"
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
      value: Value.fromJSON(loadContent()),
      schema,
      author: this.props.author,
      cursorContext: {
        isFocused: false,
        newLine: false,
        parentBlockOffsets: { top: 0, left: 0 }
      }
    }
  }

  handleChange = ({ value }) => {
    this.setState({ value })

    // add information about cursor positions
    // setTimeout(
    //   function() {
    //     const { focusBlock } = value
    //     if(!focusBlock) return
    //     const nodeKey = focusBlock.key
    //     const block = window.document.querySelector(`[data-key="${nodeKey}"]`)
    //     if (!block) return
    //
    //     const cursorContext = {
    //       firstEmptyLine:
    //         value.document.isEmpty && value.document.nodes.size === 1,
    //       newLine: value.focusBlock.isEmpty,
    //       parentBlockOffsets: getOffsets(block, "top left", block, "top left"),
    //       isFocused: this.state.cursorContext.isFocused
    //     }
    //     this.setState({ cursorContext })
    //   }.bind(this),
    //   300
    // )

    // update draft status & save content to device
    setDraftStatusHelper()
    this.props.composerState.raw = JSON.stringify(value.toJSON())
    saveContent(document, value)
  }

  // image button handler:
  handleImageButton = event => {
    // if (!event) return
    // event.preventDefault()
    // event.stopPropagation()
    //
    // const activeBlockKey = this.state.value.focusBlock.key
    // const resolvedState = this.state.value
    //   .change()
    //   .insertBlock({
    //     type: "docket",
    //     isVoid: true
    //   })
    //   .value.change()
    //   .removeNodeByKey(activeBlockKey)
    // this.setState({
    //   value: resolvedState.value,
    //   cursorContext: { ...this.state.cursorContext, newLine: false }
    // })
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
          plugins={plugins}
          renderNode={renderNode}
          renderMark={renderMark}
          schema={this.state.schema}
          value={this.state.value}
          onChange={this.handleChange}
          style={{ minHeight: "28em" }}
        />
      </div>
    )
  }
}
