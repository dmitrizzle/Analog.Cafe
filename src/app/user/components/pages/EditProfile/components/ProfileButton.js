import { ButtonStyles } from "@roast-cms/react-button-beans"
import styled from "styled-components"

import { styles } from "../../../../../core/components/controls/Card/components/CardButton"

export default styled.input`
  ${ButtonStyles} ${styles} border: 0;
  user-select: text;
  outline: 0;
  width: 100%;
  cursor: text;
  &:active,
  &:focus,
  &.active {
    background: ${props => props.theme.color.background()} !important;
    color: ${props => props.theme.color.foreground()} !important;
    box-shadow: 0 1px 1px rgba(44, 44, 44, 0.25),
      0 0 0 1px rgba(44, 44, 44, 0.125) !important;
  }
`
