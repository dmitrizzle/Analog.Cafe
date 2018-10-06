import { ButtonStrip } from "@roast-cms/react-button-beans"
import React from "react"
import styled from "styled-components"
import open from "oauth-open"

import {
  brandButtonStyles,
  twitterButtonStyles
} from "../../Button/components/SocialButtons"
import ButtonStripItem from "../../Button/components/ButtonStripItem"
import Twitter from "../../../icons/Social/components/Twitter"

export const Menu = styled(ButtonStrip)`
  display: ${props => (props.hidden ? "none" : "block")};
  position: absolute;
  z-index: ${props => props.theme.layer.up + 1};
  width: 100px;
  height: 20px;
`

const MenuItem = styled(ButtonStripItem)`
  ${brandButtonStyles}${twitterButtonStyles};
  width: 2em;
  padding-left: 0;
  svg {
    margin-left: 0
  }
`

export default props => (
  <Menu
    key="App_SelectionNav"
    hidden={props.selection.hidden}
    style={{
      top: `${props.selection.topOffset - 30}px`,
      left: `${props.selection.leftOffset - 20}px`
    }}
  >
    <div>
      <MenuItem
        left
        right
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          open(
            `https://twitter.com/intent/tweet?text=${props.selection.text}`,
            () => {}
          )
        }}
      >
        <Twitter />
      </MenuItem>
    </div>
  </Menu>
)
