import React from "react"
import styled from "styled-components"

import { TEXT_STATUS_LABELS } from "../../../../constants/messages-list"
import { getTitleFromSlug } from "../../../../utils/messages-"

const Stats = styled.span`
  ${props => props.theme.typography.title.auto} margin: 0;
  display: block;
  color: ${props => props.theme.color.brand()};
  ${props => props.status === "loading" && `letter-spacing: 0 !important;`};
`
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
        (props.item.tag !== "photo-essay"
          ? ` | ${Math.ceil((props.item.stats.words + 101) / 200)}-minute read`
          : ` | ${props.item.stats.images} image${
              props.item.stats.images > 1 ? "s" : ""
            }`)}

      {props.item.type !== "placeholder" &&
        props.private &&
        ` ↝ ${TEXT_STATUS_LABELS[props.item.status]}`}
    </Stats>
  )
}
