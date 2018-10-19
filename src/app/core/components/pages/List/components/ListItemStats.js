import React from "react"
import styled from "styled-components"

import { TEXT_STATUS_LABELS } from "../../../../constants/messages-list"
import { getTitleFromSlug } from "../../../../utils/messages-"

export const Stats = styled.span`
  ${props => props.theme.typography.title.auto} margin: 0;
  display: block;
  color: ${props => props.theme.color.brand()};
  ${props => props.status === "loading" && `letter-spacing: 0 !important;`};
`
export const readingTime = stats =>
  Math.ceil(stats.words / 250 + stats.images * 0.25)

export default props => {
  return (
    <Stats>
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
      {props.item.type !== "placeholder" &&
        !props.private &&
        (props.item.stats.images > 0
          ? ` | ${props.item.stats.images} image${
              props.item.stats.images > 1 ? "s" : ""
            }`
          : "") + ` | ${readingTime(props.item.stats)} min`}

      {props.item.type !== "placeholder" &&
        props.private &&
        ` ↝ ${TEXT_STATUS_LABELS[props.item.status]}`}
    </Stats>
  )
}
