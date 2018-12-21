import { withRouter } from "react-router-dom"
import React from "react"
import styled from "styled-components"

import { ROUTE_TAGS } from "../../../../constants/routes-list"
import { TEXT_STATUS_LABELS } from "../../../../constants/messages-list"
import { getTitleFromSlug } from "../../../../utils/messages-"

export const Stats = styled.span`
  ${props => props.theme.typography.title.auto} margin: 0;
  color: ${props => props.theme.color.brand()};
  ${props => props.status === "loading" && `letter-spacing: 0 !important;`};
`
export const readingTime = stats =>
  Math.ceil(stats.words / 250 + stats.images * 0.25)

export const readType = (images, readingTime) => {
  const longRead = readingTime > 4 ? true : false
  const wellIllustrated = images / readingTime > 1 ? true : false
  const inDepth = wellIllustrated && longRead ? true : false

  if (inDepth) return "in-depth"
  if (wellIllustrated) return "well-illustrated"
  if (longRead) return "long-read"
  return "quick-read"
}

export const ReadType = styled.span`
  padding: 0.5em;
  color: ${props => props.theme.color.foreground()};
  font-variant: all-petite-caps;
`

export default withRouter(props => {
  return (
    <Stats
      onClick={event => {
        event.preventDefault()
        event.stopPropagation()
        const route = Object.keys(ROUTE_TAGS).find(
          key => ROUTE_TAGS[key] === props.item.tag
        )
        console.log(route)
        props.history.push(`${route}`)
      }}
    >
      {props.item.type !== "placeholder" &&
        props.private &&
        props.item.tag &&
        "#"}
      {props.item.type !== "placeholder" &&
        (props.item.tag
          ? getTitleFromSlug(props.item.tag, {
              smartTagFromImageCount: props.item.stats.images
            })
          : "Submitted")}
      {props.item.stats && (
        <ReadType
          title={`${props.item.stats.images} image${
            props.item.stats.images > 1 ? "s" : ""
          }, ${readingTime(props.item.stats)} min read`}
        >
          {readType(props.item.stats.images, readingTime(props.item.stats))}
        </ReadType>
      )}

      {props.item.type !== "placeholder" &&
        props.private &&
        ` ↝ ${TEXT_STATUS_LABELS[props.item.status]}`}
    </Stats>
  )
})
