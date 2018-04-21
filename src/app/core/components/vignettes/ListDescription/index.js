import React from "react"

import { APP_NAME } from "../../../../constants"
import { ListDescription as ListDescriptionStyles, BrandName } from "./styles"

export { ListHeader } from "./styles"

// return
export const ListDescription = props => {
  return (
    <ListDescriptionStyles {...props}>
      <BrandName>{APP_NAME}</BrandName>
      {props.children}
    </ListDescriptionStyles>
  )
}
