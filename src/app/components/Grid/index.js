// tools
import React from "react"
import { froth } from "../../../utils/image-froth"

import { ROUTE_AUTHOR_API } from "../../../constants/author"

// components
import { ModalDispatch } from "../../containers/Modal"

import { GridButton, AspectRatio, GridButtonCaption } from "./styles"

// exports
export const GridButtonImage = props => {
  return (
    <GridButton
      style={props.noShim ? { minHeight: 0 } : null}
      highlight={props.highlight}
      onClick={() => (props.status === "ok" ? props.add(props.src) : null)}
    >
      <AspectRatio>
        <img
          src={
            froth({
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
          <ModalDispatch
            with={{
              request: {
                url: ROUTE_AUTHOR_API + "/" + props.author.id
              }
            }}
          >
            {props.author.name}
          </ModalDispatch>
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
