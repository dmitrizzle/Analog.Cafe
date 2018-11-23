import React from "react"

import { GA } from "../../../../../utils"
import Button from "../../../controls/Button/components/Button"
import Form from "../../../../../user/components/forms/Form"
import SearchInput from "../../SearchInput"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      warning: false
    }
  }
  handleEmailChange = event => {
    this.setState({ query: event.target.value || "", warning: false })
    this.props.searchText(event.target.value)
  }
  handleSubmit = event => {
    event.stopPropagation()
    event.preventDefault()
    this.props.submitCallback && this.props.submitCallback(this.state.query)
    GA.event({
      category: "Navigation",
      action: "SearchForm_send",
      label: this.props.formLocation ? this.props.formLocation : null
    })
  }
  handleInputClick = event => {
    event.stopPropagation()
  }
  render = () => {
    return (
      <Form
        style={this.props.style || null}
        withinGroup={this.props.withinGroup}
      >
        <SearchInput
          onChange={this.handleEmailChange}
          warning={this.state.warning}
          autoFocus={this.props.autoFocus}
          onClick={this.handleInputClick}
        />
        <Button
          inverse
          onClick={event => {
            this.handleSubmit(event)
          }}
          loading={this.props.loading}
        >
          {this.props.buttonText || "Search"}
        </Button>
      </Form>
    )
  }
}
