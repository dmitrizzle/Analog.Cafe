// tools
import React from "react"

// components
import { ButtonStrip, Item } from "../../../components/_controls/ButtonStrip"

export default props => {
  return (
    <ButtonStrip
      style={{
        margin: "1em auto 0"
      }}
    >
      <div>
        <Item left>Edit</Item>
        <Item right>Publish</Item>
      </div>
    </ButtonStrip>
  )
}
