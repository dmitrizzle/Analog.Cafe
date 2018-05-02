import styled from "styled-components"

import { TEXT_EMOJIS } from "../../../../constants"

export default styled.header`
  padding: ${props => props.theme.size.block.spacing / 4}em
    ${props => props.theme.size.block.spacing / 2}em;
  z-index: ${props => props.theme.layer.up};
  display: flex;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 1px 1px
      ${props => props.theme.color.foreground(props.theme.opacity.least * 2)},
    0 0 0 1px
      ${props => props.theme.color.foreground(props.theme.opacity.least)};
  h3,
  input {
    ${props => props.theme.size.font.auto} ${props =>
  props.theme.typography.title.auto} white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    padding: 0;
  }
  h3::before,
  input::before {
    content: "${TEXT_EMOJIS.STAR}";
  }
  a {
    ${props => props.theme.size.font.auto} text-decoration:none;
    &:active {
      background: 0 0;
      color: ${props => props.theme.color.brand()};
    }
  }
`
