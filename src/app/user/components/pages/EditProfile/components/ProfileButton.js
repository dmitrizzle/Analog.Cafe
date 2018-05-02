import { ButtonStyles } from "@roast-cms/react-button-beans"
import styled from "styled-components"

import { styles } from "../../../../../core/components/controls/Card/components/CardButton"

export default styled.input`
  ${ButtonStyles} ${styles} border: 0;
  user-select: text;
  outline: 0;
  width: 100%;
  cursor: text;
  &:active {
    background: initial !important;
    color: initial !important;
  }
`
