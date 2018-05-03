import React from "react"

import { ROUTE_API_AUTHORS } from "../../../../../core/constants/routes-article"
import { makeFroth } from "../../../../../utils"
import AspectRatio from "./AspectRatio"
import GridButton from "./GridButton"
import GridButtonCaption from "./GridButtonCaption"
import Modal from "../../../../../core/components/controls/Modal"

export default props => {
  return (
    <GridButton
      style={props.noShim ? { minHeight: 0 } : null}
      label={props.label}
      span={props.span}
      onClick={() =>
        props.status === "ok"
          ? props.add(props.src, props.author || null)
          : null
      }
    >
      <AspectRatio>
        <img
          src={
            makeFroth({
              src: props.status === "ok" ? props.src : null,
              size: "t",
              crop: "square"
            }).src
          }
          alt=""
          onDragStart={event => {
            event.preventDefault()
            event.stopPropagation()
          }}
        />
      </AspectRatio>
      {props.author && (
        <GridButtonCaption>
          <Modal
            with={{
              request: {
                url: ROUTE_API_AUTHORS + "/" + props.author.id
              }
            }}
          >
            {props.author.name}
          </Modal>
        </GridButtonCaption>
      )}
    </GridButton>
  )
}
