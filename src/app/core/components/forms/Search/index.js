import { connect } from "react-redux"
import React from "react"

import { GA } from "../../../../utils"
import { TEXT_LABELS } from "../../../constants/messages-"
import { getSearchResults } from "../../../store/actions-search"
import ButtonGroupDivider from "../../controls/Button/components/ButtonGroupDivider"
import CardButton, {
  CardSearchItem
} from "../../controls/Card/components/CardButton"
import SearchForm from "./components/SearchForm"

export class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchForm: false,
      hideSearchResults: false
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
    this.props.getSearchResults(query)
  }
  handleSearchText = text => {
    this.props.searchText(text)
    text === ""
      ? this.setState({ hideSearchResults: true })
      : this.setState({ hideSearchResults: false })
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
          [
            <SearchForm
              formLocation={this.props.formLocation}
              buttonText={TEXT_LABELS.FIND}
              autoFocus
              submitCallback={this.handleSubmitCallback}
              searchText={this.handleSearchText}
              loading={this.props.search.isFetching}
              key="SearchForm"
              style={{ zIndex: 1, position: "relative" }}
            />,
            <div key="SearchResults">
              {!this.state.hideSearchResults &&
                this.props.search.data.items &&
                this.props.search.data.items.length > 0 &&
                this.props.search.data.items.map(item => {
                  return [
                    <CardSearchItem
                      key={item.link}
                      to={item.link}
                      image={
                        item.pagemap.cse_image
                          ? item.pagemap.cse_image[0].src
                          : null
                      }
                    >
                      <div>{item.title}</div>
                      <em>{item.snippet}</em>
                    </CardSearchItem>,
                    <ButtonGroupDivider
                      key={`div_${item.link}`}
                      style={{ zIndex: 1, position: "relative" }}
                    />
                  ]
                })}
            </div>
          ]
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSearchResults: query => {
      dispatch(getSearchResults(query))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)