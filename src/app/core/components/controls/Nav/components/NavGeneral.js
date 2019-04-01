// NOTE: `className` props are used in index.html
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../../utils"
import { NavLink, NavLogoLink } from "./NavLinks"
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

export const NotOnMicroScreens = styled.span`
  ${props => props.theme.size.breakpoint.max.s`
  display: none;
`};
`
export const OnlyMicroScreens = styled.span`
  ${props => props.theme.size.breakpoint.min.m`
    display: none;
  `};
`
export const Extra = styled.span`
  ${props => props.theme.size.breakpoint.max.l`
    display: none;
  `};
`
export const Condensed = styled.span`
  ${props => props.theme.size.breakpoint.min.xl`
    display: none;
  `};
`

export const isActiveUrl = (to, options = {}, props) => {
  const currentUrl = options.modalUrl
    ? props.modalUrl
    : window.location.pathname

  if (options.modalUrl && props.isModalHidden) return false
  if (currentUrl === to) return true
  // if (
  //   currentUrl &&
  //   currentUrl.includes(ROUTE_URL_ARTICLES) &&
  //   props.articleTag === to.replace("/", "")
  // )
  //   return true
  return false
}

export default props => {
  const a = "active"

  const mr = "/resources"
  const ab = "/about"
  const f = "/favourites"

  const resources = {
    to: mr,
    className: isActiveUrl(mr) ? a : undefined
  }
  const about = {
    to: ab,
    className: isActiveUrl(ab) ? a : undefined
  }
  const favourites = {
    to: f,
    className: isActiveUrl(f) ? a : undefined
  }

  const navSearch = {
    className: isActiveUrl("nav/find", { modalUrl: true }, props)
      ? a
      : undefined
  }
  const navMore = {
    className: (isActiveUrl("nav/account", { modalUrl: true }, props)
    ? // ||
      // isActiveUrl("/submissions") ||
      // isActiveUrl("/favourites")
      "active"
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
      <NavItem
        prime={props.userStatus === "ok" ? null : undefined}
        left={props.userStatus === "ok" ? null : undefined}
        className={props.userStatus === "ok" ? "prime left" : null}
      >
        {props.userStatus !== "ok" ? (
          <NavLink
            {...about}
            onClick={() => {
              GA.event({
                category: "Navigation",
                action: "Nav.click",
                label: "About"
              })
            }}
          >
            About
            <Extra> ✹</Extra>
          </NavLink>
        ) : (
          <NavLink
            {...favourites}
            onClick={() => {
              GA.event({
                category: "Navigation",
                action: "Nav.click",
                label: "Favourites"
              })
            }}
          >
            Fav
            <NotOnMicroScreens>ourites </NotOnMicroScreens>
            <OnlyMicroScreens>es</OnlyMicroScreens>
            <Extra> ❤︎</Extra>
          </NavLink>
        )}
      </NavItem>

      <NavItem
        prime={props.userStatus !== "ok" ? null : undefined}
        left={props.userStatus !== "ok" ? null : undefined}
        className={props.userStatus !== "ok" ? "prime left" : null}
      >
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
          Resource
          <NotOnMicroScreens>s </NotOnMicroScreens>
          <Extra>❖</Extra>
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

      <NavItem narrow prime right className="prime right">
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
        <NavMore
          userImage={props.userImage}
          userStatus={props.userStatus}
          userRole={props.userRole}
          {...navMore}
        >
          <Extra>My </Extra>
          <NotOnMicroScreens>Account </NotOnMicroScreens>
          <OnlyMicroScreens>Me </OnlyMicroScreens>
          <NavAvatar image={props.userImage} />
        </NavMore>
      </NavItem>
    </ul>
  )
}
