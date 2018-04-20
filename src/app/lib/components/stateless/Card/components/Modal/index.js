// tools
import React from "react"

// styles
import { Card } from "../../"
export { ModalOverlay } from "./styles"

// return
export const CardModal = props => {
  return (
    <Card
      {...props}
      style={{
        margin: "5vh auto 90.1vh" // 90.1vh is required for iOS to be scrollable
      }}
    />
  )
}
