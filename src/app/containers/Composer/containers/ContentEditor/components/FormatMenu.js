// tools
import React from "react"

// components
import { TinyButton } from "../../../../../components/Button"

import styled from "styled-components"
const Menu = styled.div`
  display: flex;
  width: 10em;
  position: absolute;
  border-radius: ${props => props.theme.effects.borderRadius.small}em;
`
const Item = styled(({ left, right, script, ...props }) => (
  <TinyButton {...props} />
))`
  margin: 0;
  border-radius: 0;
  ${props =>
    props.left
      ? `border-radius: ${props.theme.effects.borderRadius.small}em 0 0 ${props
          .theme.effects.borderRadius.small}em`
      : null};

  ${props =>
    props.right
      ? `border-radius: 0 ${props.theme.effects.borderRadius.small}em ${props
          .theme.effects.borderRadius.small}em 0`
      : null};

  ${props =>
    props.script
      ? `font-family: ${props.theme.typography.font
          .serif} !important;font-weight: 400 !important;`
      : null};
`

// render
export default props => {
  return (
    <Menu innerRef={props.menuRef}>
      <Item left style={{ textShadow: "2px 2px rgba(44, 44, 44, 0.5)" }}>
        T
      </Item>
      <Item>❝</Item>
      <Item script>
        <strong style={{ fontWeight: "700 !important" }}>bold</strong>
      </Item>
      <Item right script>
        <em>italic</em>
      </Item>
    </Menu>
  )
}
