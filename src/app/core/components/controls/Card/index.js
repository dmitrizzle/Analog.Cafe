import React from "react"

import { SEARCH_RESULTS_FEATURED } from "../../../constants/messages-search"
import ButtonGroupDivider from "../Button/components/ButtonGroupDivider"
import ButtonKeyword from "../Button/components/ButtonKeyword"
import CardButton, { CardSearchItem } from "./components/CardButton"
import CardFigure from "./components/CardFigure"
import CardHeader from "./components/CardHeader"
import CardPopup from "./components/CardPopup"
import Search from "../../forms/Search"
import Spinner from "../../icons/Spinner"

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchMode: false,
      searchResults: false
    }
  }
  handleSearchMode = searchMode => {
    this.setState({
      searchMode
    })
  }
  handleSearchResultsShown = total => {
    total > 0
      ? this.setState({ searchResults: true })
      : this.setState({ searchResults: false })
  }
  componentWillReceiveProps = () => {
    this.setState({
      searchMode: false
    })
  }

  render = () => {
    return (
      <CardPopup style={this.props.style} id={this.props.id}>
        {!this.props.headless && (
          <CardHeader
            error={this.props.error}
            stubborn={this.props.stubborn}
            buttons={this.props.buttons}
            title={this.props.title}
          />
        )}
        <CardFigure image={this.props.image} text={this.props.text} />
        {this.props.search && [
          <Search
            onClick={event => event.stopPropagation()}
            formLocation={this.props.searchFormLocation}
            searchMode={this.handleSearchMode}
            stateOverwrite={this.state.searchMode}
            key="search"
            searchResultsShown={this.handleSearchResultsShown}
          />,
          this.state.searchMode && !this.state.searchResults
            ? SEARCH_RESULTS_FEATURED.map(item => {
                return [
                  <CardSearchItem
                    key={item.link}
                    to={item.link}
                    image={item.image || null}
                  >
                    <div>{item.title}</div>
                    <br />
                    <em>{item.snippet}</em>
                  </CardSearchItem>,
                  <ButtonGroupDivider
                    key={`div_${item.link}`}
                    style={{ zIndex: 1, position: "relative" }}
                  />
                ]
              })
            : null
        ]}
        {this.props.buttons &&
          !this.state.searchMode &&
          Object.keys(this.props.buttons).length !== 0 &&
          this.props.buttons.map(function(button, i) {
            let keyword, buttonText
            if (button && button.text) {
              const keywordMatch = button.text.match(/\[(.*?)\]/)
              keyword = keywordMatch ? keywordMatch[1] : null
              buttonText = button.text.replace(`[${keyword}]`, "")
            }
            return button && button.to && button.text ? (
              <CardButton
                onClick={button.onClick}
                to={button.to}
                key={button.to}
                branded={button.branded ? true : null}
                inverse={button.inverse ? true : null}
                mobile={button.mobile ? button.mobile : null}
              >
                {button.loading && <Spinner />}
                {buttonText}
                {keyword && (
                  <ButtonKeyword
                    branded={button.branded}
                    inverse={button.inverse}
                  >
                    {keyword}
                  </ButtonKeyword>
                )}
              </CardButton>
            ) : button && button.divider ? (
              <ButtonGroupDivider key={i} />
            ) : null
          })}
      </CardPopup>
    )
  }
}
