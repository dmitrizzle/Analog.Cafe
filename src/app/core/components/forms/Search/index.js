import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { TEXT_LABELS } from "../../../constants/messages-"
import { TEXT_ROUTE_LABELS } from "../../../constants/messages-list"
import { getSearchResults } from "../../../store/actions-search"
import ButtonGroupDivider from "../../controls/Button/components/ButtonGroupDivider"
import CardButton, {
  CardSearchItem
} from "../../controls/Card/components/CardButton"
import SearchForm from "./components/SearchForm"

export const SearchVisibility = styled.div`
  ${props => props.menu && props.theme.size.breakpoint.min.l`display:none;`};
`

// TODO: sign in sign up account instant search results
const NAV_BUTTONS = [
  {
    to: "/about",
    text: "About",
    keywords: "about,who,what,where,how,authors,editors,contact,backers"
  },
  {
    to: "/resources",
    text: "Resources",
    keywords:
      "photography,podcast,audio,downloads,guides,reference,price,reviews"
  },
  {
    to: "https://www.etsy.com/ca/shop/AnalogCafeShop",
    text: (
      <span>
        <span style={{ color: "#ed236e" }}>Etsy</span> Store
      </span>
    ),
    keywords: "etsy,store,buy,shop,camera"
  },
  { divider: true },
  {
    to: "/film-photography",
    text: "Film Photography",
    keywords:
      TEXT_ROUTE_LABELS["/film-photography"].title +
      TEXT_ROUTE_LABELS["/film-photography"].description
  },
  {
    to: "/photo-essays",
    text: "Photo Essays",
    keywords:
      TEXT_ROUTE_LABELS["/photo-essays"].title +
      TEXT_ROUTE_LABELS["/photo-essays"].description
  },
  {
    to: "/editorials",
    text: "Editorials",
    keywords:
      TEXT_ROUTE_LABELS["/editorials"].title +
      TEXT_ROUTE_LABELS["/editorials"].description
  },
  {
    to: "/solo-projects",
    text: "Solo Projects",
    keywords:
      TEXT_ROUTE_LABELS["/solo-projects"].title +
      TEXT_ROUTE_LABELS["/solo-projects"].description
  },
  {
    to: "/collaborations",
    text: "Collaborations",
    keywords:
      TEXT_ROUTE_LABELS["/collaborations"].title +
      TEXT_ROUTE_LABELS["/collaborations"].description
  },
  { divider: true },
  { to: "/submit/rules", text: "Rules", keywords: "rules,terms,conditions" },
  { to: "/privacy-policy", text: "Privacy", keywords: "privacy policy" },
  {
    to: "/submit",
    text: "Write for Analog.Cafe",
    keywords: "Get Featured,Write for Analog.Cafe,publish,guest blog"
  }
]
export class Search extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchForm: false,
      hideSearchResults: false,
      searchText: ""
    }
  }
  handleRevealSearchForm = event => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.props.searchMode(true)

    this.setState({
      searchForm: !this.state.searchForm
    })
    this.props.searchFormCallback &&
      this.props.searchFormCallback(this.state.searchForm)
  }
  handleSubmitCallback = query => {
    this.props.getSearchResults(query)
  }
  handleClearSearch = event => {
    event.stopPropagation()
    this.props.getSearchResults("")
    this.setState({ searchText: "" })
  }
  handleSearchText = text => {
    this.props.searchText(text)
    text === ""
      ? this.setState({ hideSearchResults: true, searchText: text })
      : this.setState({ hideSearchResults: false, searchText: text })
  }
  componentDidMount = () => {
    !this.props.menu && this.handleRevealSearchForm()
  }
  componentWillReceiveProps = nextProps => {
    !nextProps.menu && this.handleRevealSearchForm()

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
    const haveSearchResults =
      !this.state.hideSearchResults &&
      this.props.search.data.items &&
      this.props.search.data.items.length > 0
    const isNotFound =
      this.props.search.data.queries.request &&
      this.props.search.data.queries.request[0].searchTerms &&
      this.props.search.data.queries.request[0].searchTerms.length > 1
    const isInstantSearch =
      this.state.searchText !== "" && !haveSearchResults && !isNotFound

    return (
      <SearchVisibility menu={this.props.menu}>
        {!this.state.searchForm ? (
          <CardButton
            noDownstate
            style={{ background: "#dfdfdf", cursor: "text" }}
            onClick={this.handleRevealSearchForm}
          >
            {TEXT_LABELS.SEARCH}
          </CardButton>
        ) : (
          [
            <SearchForm
              formLocation={this.props.formLocation}
              autoFocus={
                "ontouchstart" in document.documentElement ? false : true
              }
              submitCallback={this.handleSubmitCallback}
              searchText={this.handleSearchText}
              searhTextValue={this.state.searchText}
              loading={this.props.search.isFetching}
              key="SearchForm"
              style={{ zIndex: 1, position: "relative" }}
            />,
            haveSearchResults || isNotFound ? (
              <CardButton
                key="SearchResultsReset"
                inverse
                onClick={this.handleClearSearch}
              >
                Clear ✕
              </CardButton>
            ) : null,
            <div key="SearchResults">
              {haveSearchResults &&
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
              {isNotFound &&
                !this.props.search.data.items && (
                  <CardSearchItem to="/subscribe">
                    <div>Not Found</div>
                    <em>
                      We publish new content every week.{" "}
                      <strong>Subscribe</strong> to our weekly newsletter to get
                      notified when the new articles get published.
                    </em>
                  </CardSearchItem>
                )}
            </div>,
            !haveSearchResults ? (
              <ButtonGroupDivider key="searchTypeDivider" />
            ) : null,
            NAV_BUTTONS.map(button => {
              if (isInstantSearch) {
                if (!button.keywords || !button.text) return null
                const titleKywords =
                  typeof button.text === "string" ? button.text : ""
                const searchKeywords = button.keywords || ""
                const concatKeywords = searchKeywords + titleKywords
                if (
                  !concatKeywords.toLowerCase().includes(this.state.searchText)
                )
                  return null
              }

              return button.divider ? (
                <ButtonGroupDivider key={`div_${Math.random()}`} />
              ) : (
                <CardButton
                  onClick={button.onClick}
                  to={button.to}
                  key={`div_${button.to || button.onClick || Math.random()}`}
                >
                  {button.text}
                </CardButton>
              )
            })
          ]
        )}
      </SearchVisibility>
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
