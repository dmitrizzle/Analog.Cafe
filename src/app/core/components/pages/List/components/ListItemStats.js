import React from "react"
import styled from "styled-components"

import { TEXT_STATUS_LABELS } from "../../../../constants/messages-list"

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
      {props.item.tag
        ? props.item.tag === "photo-essay" && props.item.stats.images === 1
          ? "Single-Frame Narrative"
          : (props.item.tag + "")
              .replace(/-/g, " ")
              .replace(/\b\w/g, l => l.toUpperCase())
        : "Submitted"}
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
