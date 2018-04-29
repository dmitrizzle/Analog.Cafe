import React from "react"
import styled from "styled-components"

import { INPUT_SUMMARY_LIMIT } from "../../../../../user/constants/rules-submission"
import { TEXT_EMOJIS } from "../../../../../constants"
import Sidenote from "../../../vignettes/Sidenote"

const ListCaption = styled(Sidenote)`
  display: block !important;
  overflow: hidden;
  margin: 0;
  margin-bottom: 0.7em;
  max-width: ${props => props.theme.size.block.column.m}px;
  height: ${1.5 * 3 + 0.1}em;
  ${props => props.status === "loading" && `height: 4em;`};
  &::after,
  &::before {
    display: none;
  }
  .long,
  .short {
    opacity: ${props => props.theme.opacity.half};
    display: none;
  }
  ${props => props.theme.size.breakpoint.max.m`{
    .long {display:inline}
  }`} ${props => props.theme.size.breakpoint.min.l`{
    .short {display:inline}
  }`} ${props => props.theme.size.breakpoint.max.m`{
		height: auto !important;
		overflow: visible;
		margin-top: .3em;
		margin-bottom: 0;
	}`};
`
const ListSubtitle = props => {
  return (
    <span>
      <span>
        {props.title}
        &nbsp;
      </span>
      {props.subtitle && <span>({props.subtitle}) &nbsp;</span>}
    </span>
  )
}
export default props => {
  return (
    <ListCaption
      status={props.status}
      style={props.item.status === "rejected" ? { opacity: "0.25" } : null}
    >
      <ListSubtitle subtitle={props.item.subtitle} title={props.item.title} />
      <span className="long">
        <span style={{ fontStyle: "normal" }}>{TEXT_EMOJIS.PARAGRAPH}</span>
        {props.item.summary.substr(0, INPUT_SUMMARY_LIMIT - 1) + "…"}
      </span>
      <span className="short">
        <span style={{ fontStyle: "normal" }}>{TEXT_EMOJIS.PARAGRAPH}</span>
        {props.item.summary.substr(
          0,
          INPUT_SUMMARY_LIMIT / 1.6 -
            (props.item.subtitle || "").length -
            props.item.title.length -
            1
        ) + "…"}
      </span>
    </ListCaption>
  )
}
