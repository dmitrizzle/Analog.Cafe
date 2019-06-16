import React from "react"

import ButtonGroupDivider from "../Button/components/ButtonGroupDivider"
import ButtonKeyword from "../Button/components/ButtonKeyword"
import CardButton from "./components/CardButton"
import CardFigure from "./components/CardFigure"
import CardHeader from "./components/CardHeader"
import CardPopup from "./components/CardPopup"
import FollowButtons from "../ArticleActions/components/FollowButtons"
import Search from "../../forms/Search"
import Spinner from "../../icons/Spinner"

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // searchMode: false,
      searchText: ""
    }
  }
  // handleSearchMode = searchMode => {
  //   this.setState({
  //     searchMode
  //   });
  // };
  handleSearchText = searchText => {
    this.setState({ searchText })
  }
  // componentWillReceiveProps = () => {
  //   this.setState({
  //     searchMode: false
  //   });
  // };

  render = () => {
    return (
      <CardPopup style={this.props.style} id={this.props.id}>
        {!this.props.headless && (
          <CardHeader
            error={this.props.error}
            stubborn={this.props.stubborn}
            buttons={this.props.buttons}
            title={this.props.title}
            noStar={this.props.menu || this.props.search}
          />
        )}
        <CardFigure image={this.props.image} text={this.props.text} />
        {this.props.search && [
          <Search
            onClick={event => event.stopPropagation()}
            formLocation={this.props.searchFormLocation}
            // searchMode={this.handleSearchMode}
            // stateOverwrite={this.state.searchMode}
            key="search"
            searchText={this.handleSearchText}
            menu={this.props.menu}
          />
        ]}
        {this.props.buttons &&
          // !this.state.searchMode &&
          Object.keys(this.props.buttons).length !== 0 &&
          this.props.buttons.map(function(button, i) {
            let keyword, buttonText
            if (button && button.text && typeof button.text === "string") {
              const keywordMatch = button.text.match(/\[(.*?)\]/)
              keyword = keywordMatch ? keywordMatch[1] : null
              buttonText = button.text.replace(`[${keyword}]`, "")
            }
            if (button && button.text && React.isValidElement(button.text)) {
              buttonText = button.text
            }
            return button && button.to && button.text ? (
              <CardButton
                to={button.to}
                key={button.to}
                onClick={button.onClick}
                branded={button.branded ? true : null}
                inverse={button.inverse ? true : null}
                mobile={button.mobile ? button.mobile : null}
                animationUnfold={button.animationUnfold}
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
        {this.props.socialButtons && <FollowButtons />}
      </CardPopup>
    )
  }
}
