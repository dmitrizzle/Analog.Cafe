import React from "react"
import styled from "styled-components"

import { APP_NAME, HEADER_ERRORS } from "../../../../../constants"
import { buttonMaker } from "../../../forms/Search"
import { getTitleFromSlug } from "../../../../utils/messages-"
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
    display: block;
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
  "/collaborations"
]
export const topicsMenuModalInfo = pathname => {
  return {
    menu: true,
    title: (
      <span>
        <BurgerMenu /> Topics
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
      )
    ]
  }
}

export const magazineSections = pathname => {
  return {
    info: topicsMenuModalInfo(pathname),
    id: "nav/topics"
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
