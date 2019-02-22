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
import Search from "../../../icons/Search"
import NavSearch from "./NavSearch"

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

export const Burger = styled.div`
  display: inline-block;
  width: 1em;
  height: 0.85em;
  margin-left: 0.15em;

  ${props => props.theme.size.breakpoint.min.m`
  margin-bottom: -1px;
  `} > div {
    height: 2px;
    margin: 3px 1px;
    background: ${props => props.theme.color.foreground()};
  }
`

export const Extra = styled.span`
  ${props => props.theme.size.breakpoint.max.s`
display: none;
`};
`

export const BurgerMenu = () => (
  <Burger>
    <div />
    <div />
    <div />
  </Burger>
)

export default props => {
  const isActiveUrl = (to, options = {}) => {
    const currentUrl = options.modalUrl
      ? props.modalUrl
      : window.location.pathname
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

  const a = "active"

  const re = "/resources"
  const gf = "/submit"

  const resources = {
    to: "/resources",
    className: isActiveUrl(re) ? a : undefined
  }
  const getFeatured = {
    to: gf,
    className: isActiveUrl(gf) ? a : undefined
  }
  const navSections = {
    className: isActiveUrl("nav/sections", { modalUrl: true }) ? a : undefined
  }
  const navMore = {
    className: isActiveUrl("nav/more", { modalUrl: true }) ? a : undefined
  }
  const navSearch = {
    className: isActiveUrl("nav/search", { modalUrl: true }) ? a : undefined
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
          {/* <span className="wide">Photo </span> */}
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
