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
import NavSections from "./NavSections"
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

  const ve = "/photo-essay"
  const fp = "/film-photography"

  const visualEssays = {
    to: "/photo-essays",
    className: isActiveUrl(ve) ? a : undefined
  }
  const filmPhotography = {
    to: fp,
    className: isActiveUrl(fp) ? a : undefined
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
      <NavItem prime left mobile className="prime left mobile">
        <NavSections {...navSections}>
          <span>
            <Extra>Sections </Extra>◈
          </span>
        </NavSections>
      </NavItem>
      <NavItem>
        <NavLink
          {...visualEssays}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "PhotoEssays"
            })
          }}
        >
          <span className="wide">Photo </span>
          Essays
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          {...filmPhotography}
          onClick={() => {
            GA.event({
              category: "Navigation",
              action: "Nav.click",
              label: "FilmPhotography"
            })
          }}
        >
          <span className="wide">Film </span>
          Photography
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
      <NavItem narrow prime left className="left">
        <NavSearch {...navSearch}>
          <LabelWithSearchSVG>
            Search <Search />
          </LabelWithSearchSVG>
        </NavSearch>
      </NavItem>
      <NavItem prime right className="prime right">
        <NavMore
          userImage={props.userImage}
          userStatus={props.userStatus}
          userRole={props.userRole}
          {...navMore}
        >
          More <BurgerMenu />
          <Extra>
            {props.userStatus === "ok" && <NavAvatar image={props.userImage} />}
          </Extra>
        </NavMore>
      </NavItem>
    </ul>
  )
}
