import { connect } from "react-redux"
import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import { withRouter } from "react-router-dom"
import React from "react"
import styled from "styled-components"

import {
  Burger,
  magazineSections
} from "../../pages/List/components/ListDescription"
import { RHCP } from "../../icons/group-beacons/Star"
import { ROUTE_URL_USER_SUBMISSIONS } from "../../../../user/constants/routes-session"
import { TEXT_ROUTE_LABELS } from "../../../constants/messages-list"
import { getSearchResults } from "../../../store/actions-search"
import { setModal } from "../../../store/actions-modal"
import ButtonGroupDivider from "../../controls/Button/components/ButtonGroupDivider"
import CardButton, {
  CardSearchItem
} from "../../controls/Card/components/CardButton"
import Cube from "../../icons/group-beacons/Cube"
import Heart from "../../icons/group-beacons/Heart"
import Pen from "../../icons/group-beacons/Pen"
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

const iconStyles = { height: ".75em", paddingBottom: ".15em" }

const NAV_BUTTONS = props => [
  {
    mobile: "on",
    to: "#topics",
    onClick: event => {
      event.preventDefault()
      event.stopPropagation()
      props.setModal({ ...magazineSections(props.location.pathname) })
    },
    text: (
      <span>
        <Burger style={{ margin: "0 0 0 -0.75em", ...iconStyles }}>
          <div />
          <div />
          <div />
        </Burger>{" "}
        Topics
      </span>
    ),
    keywords:
      "sections,magazine,call for entries,Get Featured,Write for Analog.Cafe,publish,guest blog, submit, contribute"
  },
  {
    to: "/favourites",
    text: (
      <span>
        <Heart style={iconStyles} /> Favourites
      </span>
    ),
    keywords: "likes, saved, favourite"
  },
  {
    to: ROUTE_URL_USER_SUBMISSIONS,
    text: (
      <span>
        <Pen style={iconStyles} /> Submissions
      </span>
    ),
    keywords: "contribute, guest, upload",
    memberOnly: true
  },
  {
    to: "/submit",
    text: (
      <span>
        <Pen style={iconStyles} /> Submissions
      </span>
    ),
    keywords: "contribute, guest, upload",
    visitorOnly: true
  },
  {
    to: "/submit/compose",
    text:
      loadTextContent().length > 0 ? "Edit Submission Draft" : "New Submission",
    keywords:
      "compose, submit, write, upload, send, cntribute, edit, submission, draft",
    hidden: loadTextContent().length === 0
  },
  {
    to: `/profile/edit`,
    text: (
      <span>
        <RHCP style={iconStyles} /> Profile & Settings
      </span>
    ),
    keywords: "account, avatar, link, bio, profile, settings",
    memberOnly: true
  },

  buttonMaker("/sign-out", {
    keywords: "log out, exit",
    attributes: {
      memberOnly: true
    }
  }),

  buttonMaker("/sign-in", {
    keywords: "sign up, create account, password",
    attributes: {
      visitorOnly: true
    }
  }),
  { divider: true },
  {
    to: "/features",
    hidden: true,
    text: (
      <span>
        <Cube style={iconStyles} /> Features
      </span>
    ),
    keywords:
      "photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads"
  },

  buttonMaker("/about", {
    keywords: "about,who,what,where,how,authors,editors,contact,backers",
    attributes: { mobile: "on" }
  }),

  buttonMaker("/film-photography", {
    keywords: "science, camera, emulsion",
    attributes: { hidden: true }
  }),
  buttonMaker("/photo-essays", {
    keywords: "art, photography",
    attributes: { hidden: true }
  }),
  buttonMaker("/editorials", { attributes: { hidden: true } }),
  buttonMaker("/solo-projects", { attributes: { hidden: true } }),
  {
    to: "/collaborations",
    text: "Collaborations",
    keywords:
      TEXT_ROUTE_LABELS["/collaborations"].title +
      TEXT_ROUTE_LABELS["/collaborations"].description,
    hidden: true
  },
  { to: "/submit/rules", text: "Rules", keywords: "rules,terms,conditions" },
  { to: "/privacy-policy", text: "Privacy", keywords: "privacy policy" },
  {
    to: "https://www.etsy.com/ca/shop/AnalogCafeShop",
    text: (
      <span>
        <span style={{ color: "#ed236e" }}>Etsy</span> Store
      </span>
    ),
    keywords: "etsy,store,buy,shop,camera"
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
        {[
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
                mobile={button.mobile}
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
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
)
