// NOTE: `className` props are used in index.html
import React from "react"
import styled from "styled-components"

import { NavLink, NavLogoLink } from "./NavLinks"
import { ROUTE_URL_ARTICLES } from "../../../../constants/routes-article"
import { makeFroth } from "../../../../../utils"
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
  const isActive = to => {
    if (window.location.pathname === to) return true
    if (
      window.location.pathname.includes(ROUTE_URL_ARTICLES) &&
      props.articleTag === to.replace("/", "")
    )
      return true
    return false
  }

  const a = "active"

  const ve = "/photo-essay"
  const sc = "/subscribe"
  const fp = "/film-photography"

  const visualEssays = {
    to: "/photo-essays",
    className: isActive(ve) ? a : undefined
  }
  const subscribe = {
    to: sc,
    className: isActive(sc) ? a : undefined
  }
  const filmPhotography = {
    to: fp,
    className: isActive(fp) ? a : undefined
  }

  // console.log(props.list.filter.author.id);

  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem prime left mobile className="prime left mobile">
        <NavLink {...subscribe}>
          <span>
            Subscribe <Extra>❤︎</Extra>
          </span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...visualEssays}>
          <span className="wide">Photo </span>
          Essays
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink {...filmPhotography}>
          <span className="wide">Film </span>
          Photography
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo
            image={
              props.list.author
                ? makeFroth({
                    src: props.list.author.image,
                    size: "s"
                  }).src
                : null
            }
          />
        </NavLogoLink>
      </NavItem>
      <NavItem narrow prime left className="left">
        <NavSearch>
          <LabelWithSearchSVG>
            Search <Search />
          </LabelWithSearchSVG>
        </NavSearch>
      </NavItem>
      <NavItem prime right className="prime right">
        <NavMore userStatus={props.userStatus} userRole={props.userRole}>
          Menu <BurgerMenu />
          <Extra>
            {props.userStatus === "ok" && <NavAvatar image={props.userImage} />}
          </Extra>
        </NavMore>
      </NavItem>
    </ul>
  )
}
