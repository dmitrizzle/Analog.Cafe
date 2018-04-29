import React from "react"

import { AspectRatio, GridButton, GridButtonCaption } from "./styles"
import Modal from "../../../../core/components/controls/Modal"
import { ROUTE_API_AUTHORS } from "../../../../core/constants/routes-article"
import { makeFroth } from "../../../../utils"

// exports
export const GridButtonImage = props => {
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
          alt="Editor’s suggestion"
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
export {
  GridContainer,
  GridRow,
  GridButton,
  GridButtonCaption,
  GridCaption,
  AspectRatio
} from "./styles"
