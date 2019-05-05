import React from "react"
import styled from "styled-components"

import {
  APP_DESCRIPTION,
  APP_NAME,
  HEADER_ERRORS
} from "../../../../../constants"
import { buttonMaker } from "../../../forms/Search"
import { getTitleFromSlug } from "../../../../utils/messages-"
import Cube from "../../../icons/group-beacons/Cube"
import Heart from "../../../icons/group-beacons/Heart"
import ListBrandName from "./ListBrandName"
import ListDescriptionWrapper from "./ListDescriptionWrapper"
import ListHeader from "./ListHeader"
import Modal from "../../../controls/Modal"

export const Desktop = styled.span`
  @media (max-width: 48em) {
    display: none;
  }
`
export const Mobile = styled.span`
  display: none;
  @media (max-width: 48em) {
    display: inline;
  }
`

export const Burger = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0 0.25em -0.15em 0.25em;
  ${props =>
    props.inverse && props.theme.size.breakpoint.max.s`display: none;`};
  > div {
    height: 1px;
    margin: 4px 0;
    background: ${props =>
      !props.inverse
        ? props.theme.color.foreground()
        : props.theme.color.background()};
  }
`
export const BurgerMenu = props => (
  <Burger {...props}>
    <div />
    <div />
    <div />
  </Burger>
)
const DescriptionModalLink = styled(Modal)`
  &:active {
    background: transparent !important;
    color: ${props => props.theme.color.background()} !important;
  }
  text-decoration: none;
`

export const sectionButtons = [
  "/film-photography",
  "/photo-essays",
  "/editorials",
  "/solo-projects",
  "/collaborations",
  "/favourites"
]
const iconStyles = { height: ".75em", paddingBottom: ".15em" }

export const magazineSections = pathname => {
  return {
    info: {
      menu: true,
      title: (
        <span>
          <BurgerMenu /> {APP_DESCRIPTION}
        </span>
      ),
      buttons: [
        {
          to: "/",
          text: "Newest Articles",
          inverse: pathname === "/"
        },
        ...sectionButtons.map(section =>
          buttonMaker(section, {
            attributes: {
              inverse: pathname === section
            }
          })
        ),
        { divider: true },
        {
          to: "/features",
          text: (
            <span>
              <Cube style={iconStyles} /> Features
            </span>
          ),
          keywords:
            "photography,podcast,audio,downloads,guides,reference,price,reviews,features,resources,must,reads"
        },
        {
          to: "/favourites",
          text: (
            <span>
              <Heart style={iconStyles} /> Favourites
            </span>
          ),
          keywords: "likes, saved, favourite"
        }
      ]
    },
    id: "nav/sections"
  }
}

export default props => {
  const mobileContent =
    getTitleFromSlug(props.location.pathname).replace("/", "") || APP_NAME
  return (
    <ListDescriptionWrapper {...props}>
      <ListBrandName
        homepage={props.location.pathname === "/"}
        style={{ width: mobileContent !== APP_NAME ? "12em" : "" }}
      >
        <Desktop>{APP_NAME}</Desktop>
        <Mobile>{mobileContent}</Mobile>
      </ListBrandName>
      {props.user.connection.status !== "offline" ? (
        <ListHeader>
          <span>
            <em>
              <DescriptionModalLink
                unmarked
                element="a"
                with={magazineSections(props.location.pathname)}
              >
                {props.renderedListMeta.title} <BurgerMenu inverse />
              </DescriptionModalLink>
            </em>
          </span>
        </ListHeader>
      ) : (
        <ListHeader>
          <em>{HEADER_ERRORS.LIST_OFFLINE.title}</em>{" "}
          {HEADER_ERRORS.LIST_OFFLINE.emoji}
        </ListHeader>
      )}
    </ListDescriptionWrapper>
  )
}
