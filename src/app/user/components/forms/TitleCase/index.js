import React from "react"
import toTitleCase from "titlecase"

import { INPUT_FORMAT } from "../../../constants/rules-submission"
import SubtitleTextarea from "../TextInput/components/SubtitleTextarea"
import TitleTextarea from "../TextInput/components/TitleTextarea"

const components = {
  title: TitleTextarea,
  subtitle: SubtitleTextarea
}
export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { value: props.value || "" }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = event => {
    const caret = event.target.selectionEnd
    const element = event.target
    window.requestAnimationFrame(() => {
      element.selectionStart = caret
      element.selectionEnd = caret
    })
    this.setState({
      value: INPUT_FORMAT(toTitleCase(event.target.value))
    })
    this.props.onChange(event.target.value)
  }
  render = () => {
    const InputElement = components[this.props.inputDesignation]
    return (
      <InputElement
        ref="input"
        autoFocus={this.props.autoFocus}
        value={this.state.value}
        onChange={this.handleChange}
        className={this.props.className}
        placeholder={this.props.placeholder}
        warning={this.props.warning}
        caution={this.props.caution}
        maxLength={this.props.maxLength}
        onKeyPress={this.props.onKeyPress}
      />
    )
  }
}
