import { connect } from "react-redux"
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"
import styled from "styled-components"

import { ROUTE_URL_USER_SUBMISSIONS } from "../../../../user/constants/routes-session"
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

// this function helps with refactoring
export const buttonMaker = (to, options = {}) => {
  let keywords = options.keywords || ""
  const attributes = options.attributes || {}
  if (TEXT_ROUTE_LABELS[to]) {
    keywords =
      keywords +
      TEXT_ROUTE_LABELS["/film-photography"].title +
      TEXT_ROUTE_LABELS["/film-photography"].description
  }
  return {
    to,
    text:
      options.text ||
      to
        .replace("-", " ")
        .replace("/", "")
        .replace(/\b\w/g, l => l.toUpperCase()),
    keywords,
    ...attributes
  }
}
const NAV_BUTTONS = props => [
  {
    to: "/",
    text: "Analog.Cafe",
    keywords: "about,who,what,where,how,authors,editors,contact,backers",
    inverse: true
  },
  buttonMaker("/about", {
    keywords: "about,who,what,where,how,authors,editors,contact,backers"
  }),
  buttonMaker("/resources", {
    keywords:
      "photography,podcast,audio,downloads,guides,reference,price,reviews,resources,must,reads"
  }),
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
  buttonMaker("/film-photography", { keywords: "science" }),
  buttonMaker("/photo-essays", { keywords: "art" }),
  buttonMaker("/editorials"),
  buttonMaker("/solo-projects"),
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
    text: "Submit Your Photography",
    keywords:
      "call for entries,Get Featured,Write for Analog.Cafe,publish,guest blog, submit, contribute"
  },
  buttonMaker("/sign-in", {
    keywords: "sign up, create account, password",
    attributes: {
      hidden: true,
      visitorOnly: true
    }
  }),
  {
    to: "/submit/compose",
    text:
      loadTextContent().length > 0
        ? "✏︎ Edit Submission Draft"
        : "✏︎ New Submission",
    keywords: "compose, submit, write, upload, send, cntribute",
    hidden: true
  },
  {
    to: ROUTE_URL_USER_SUBMISSIONS,
    text: "✒︎ Submissions",
    keywords: "my stuff, results, drafts, portfolio",
    hidden: true,
    memberOnly: true
  },
  {
    to: "/favourites",
    text: "Favourites",
    keywords: "likes, saved",
    hidden: true,
    membersOnly: true
  },
  {
    to: `/profile/edit`,
    text: "Profile & Settings",
    keywords: "account, avatar, link, bio",
    hidden: true,
    membersOnly: true
  },
  buttonMaker("/sign-out", {
    keywords: "log out, exit",
    attributes: {
      hidden: true,
      memberOnly: true
    }
  })
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
  // handleRevealSearchForm = event => {
  //   if (event) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }
  //
  //   // this.props.searchMode && this.props.searchMode(true);
  //
  //   this.setState({
  //     searchForm: !this.state.searchForm
  //   })
  //   this.props.searchFormCallback &&
  //     this.props.searchFormCallback(this.state.searchForm)
  // }
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
  // componentDidMount = () => {
  //   !this.props.menu && this.handleRevealSearchForm()
  // }
  // componentWillReceiveProps = nextProps => {
  //   //!nextProps.menu && this.handleRevealSearchForm()
  //
  //   if (
  //     nextProps.stateOverwrite === null ||
  //     nextProps.stateOverwrite === undefined
  //   )
  //     return;
  //   this.setState({
  //     searchForm: nextProps.stateOverwrite
  //   });
  // };
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
        {//   !this.state.searchForm ? (
        //   <CardButton
        //     noDownstate
        //     style={{ background: "#dfdfdf", cursor: "text" }}
        //     onClick={this.handleRevealSearchForm}
        //   >
        //     {TEXT_LABELS.SEARCH}
        //   </CardButton>
        // ) : (
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
          NAV_BUTTONS(this.props).map(button => {
            if (isInstantSearch) {
              // FUZZY SEARCH
              if (!button.keywords || !button.text) return null

              // keywords in the button:
              const titleKywords =
                typeof button.text === "string" ? button.text : ""
              const metaKeywords = button.keywords || ""
              const buttonKeywords = metaKeywords + titleKywords
              const parsedButtonKeywords = buttonKeywords
                .toLowerCase()
                .split(/[ ,]+/)
                .filter(keyword => keyword.length > 0)

              // keywords in search field
              const parsedTypedKeywords = this.state.searchText
                .toLowerCase()
                .split(/[ ,]+/)
                .filter(keyword => keyword.length > 0)
                .slice(0, 5)

              // find
              let notFound = true
              parsedTypedKeywords.forEach(typedKyword => {
                parsedButtonKeywords.forEach(buttonKeyword => {
                  buttonKeyword.includes(typedKyword) && (notFound = false)
                })
              })

              if (notFound) return null
            }

            // hidden buttons which appear only for fuzzy search
            if (button.hidden && !isInstantSearch) return null

            // buttons requiring logged in users aren't shown in search for visitors
            if (button.memberOnly && this.props.user.status !== "ok")
              return null

            // buttons only for visitors/signed-out users
            if (button.visitorOnly && this.props.user.status === "ok")
              return null

            return button.divider ? (
              <ButtonGroupDivider key={`div_${Math.random()}`} />
            ) : (
              <CardButton
                onClick={button.onClick}
                to={button.to}
                key={`div_${button.to || button.onClick || Math.random()}`}
                inverse={button.inverse}
              >
                {button.text}
              </CardButton>
            )
          })
        ]
        //  )
        }
      </SearchVisibility>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    user: state.user
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
