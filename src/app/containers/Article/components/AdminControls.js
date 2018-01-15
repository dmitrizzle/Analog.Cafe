// tools
import React from "react"
import styled from "styled-components"

// components
import { TinyButton } from "../../../components/_controls/Button"

export default props => {
  return (
    <div>
      <TinyButton>Edit</TinyButton>
      <TinyButton>Publish</TinyButton>
    </div>
  )
}
