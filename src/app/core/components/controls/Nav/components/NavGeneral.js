// NOTE: `className` props are used in index.html
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../../utils"
import { NavLink, NavLogoLink } from "./NavLinks"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
import NavAvatar from "./NavAvatar"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"
import NavMore from "./NavMore"
import NavSearch from "./NavSearch"
import Search from "../../../icons/Search"

export const LabelWithSearchSVG = styled.span`
  svg {
    width: 1em;
    margin: -0.25em 0.15em 0 0;
    z-index: 1;
    position: relative;
    path {
      stroke: ${props => props.theme.color.foreground()};
      stroke-width: 2;
    }
  }
`

export const Extra = styled.span`
  ${props => props.theme.size.breakpoint.max.s`
display: none;
`};
`

export const isActiveUrl = (to, options = {}, props) => {
  const currentUrl = options.modalUrl
    ? props.modalUrl
    : window.location.pathname
  if (props) console.log(to, currentUrl)

  if (options.modalUrl && props.isModalHidden) return false
  if (currentUrl === to) return true
  if (
    currentUrl &&
    currentUrl.includes(ROUTE_URL_ARTICLES) &&
    props.articleTag === to.replace("/", "")
  )
    return true
  return false
}

export default props => {
  const a = "active"

  const re = "/resources"
  const gf = "/submit"

  const resources = {
    to: re,
    className: isActiveUrl(re) ? a : undefined
  }
  const getFeatured = {
    to: gf,
    className: isActiveUrl(gf) ? a : undefined
  }

  const navSearch = {
    className: isActiveUrl("nav/find", { modalUrl: true }, props)
      ? a
      : undefined
  }
  const navMore = {
    //isActiveUrl("/profile") ? "active" : undefined
    className: (isActiveUrl("nav/account", { modalUrl: true }, props) ||
    isActiveUrl("/profile")
    ? "active"
    : undefined)
      ? a
      : undefined
  }

  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      {/* <NavItem prime left mobile className="prime left mobile">
        <NavSections {...navSections}>
          <span>
            <Extra>Sections </Extra>◈
          </span>
        </NavSections>
      </NavItem> */}

      <NavItem narrow prime left className="left">
        <NavSearch
          {...navSearch}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Find"
            })
          }}
        >
          <LabelWithSearchSVG>
            Find <Search />
          </LabelWithSearchSVG>
        </NavSearch>
      </NavItem>

      <NavItem>
        <NavLink
          {...getFeatured}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "GetFeatured"
            })
          }}
        >
          Get Featured ✹
        </NavLink>
      </NavItem>

      <NavItem prime center className="prime center">
        <NavLogoLink
          to={"/"}
          className="indexRouteLink"
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Logo"
            })
          }}
        >
          <NavLogo />
        </NavLogoLink>
      </NavItem>

      <NavItem>
        <NavLink
          {...resources}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "Resources"
            })
          }}
        >
          {/* <span className="wide">Photo </span> */}
          Resources ☞
        </NavLink>
      </NavItem>

      <NavItem prime right className="prime right">
        <NavMore
          userImage={props.userImage}
          userStatus={props.userStatus}
          userRole={props.userRole}
          {...navMore}
        >
          My Account
          <Extra>
            <NavAvatar image={props.userImage} />
          </Extra>
        </NavMore>
      </NavItem>
    </ul>
  )
}
