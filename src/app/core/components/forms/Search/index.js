import React from "react"

import { GA } from "../../../../utils"
import { TEXT_LABELS } from "../../../constants/messages-"
import CardButton from "../../controls/Card/components/CardButton"
import SearchForm from "./components/SearchForm"

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchForm: false
    }
  }
  handleRevealSubscribeForm = event => {
    this.props.searchMode(true)
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      searchForm: !this.state.searchForm
    })
    this.props.searchFormCallback &&
      this.props.searchFormCallback(this.state.searchForm)
    GA.event({
      category: "Campaign",
      action: "ActionsCard.quickSubscribe_open",
      label: this.props.formLocation ? this.props.formLocation : null
    })
  }
  handleSubmitCallback = query => {
    console.log(query)
  }
  componentWillReceiveProps = nextProps => {
    if (
      nextProps.stateOverwrite === null ||
      nextProps.stateOverwrite === undefined
    )
      return
    this.setState({
      searchForm: nextProps.stateOverwrite
    })
  }
  render = () => {
    return (
      <div>
        {!this.state.searchForm ? (
          <CardButton inverse onClick={this.handleRevealSubscribeForm}>
            {TEXT_LABELS.SEARCH}
          </CardButton>
        ) : (
          <SearchForm
            formLocation={this.props.formLocation}
            buttonText={TEXT_LABELS.FIND}
            autoFocus
            submitCallback={this.handleSubmitCallback}
          />
        )}
      </div>
    )
  }
}
