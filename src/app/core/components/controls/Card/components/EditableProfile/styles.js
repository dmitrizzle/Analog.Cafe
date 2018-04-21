import styled from "styled-components"

import { ButtonStyles } from "../../../Button"
import { CaptionStyles } from "../../../../styles/CaptionStyles"
import { CardButtonStyles, CardCaptionStyles, CardHeader } from "../../styles"
import { TextareaWithHighlights } from "../../../../../../user/components/forms/InputStyles"

export { CardFlattened } from "../../styles"
export const CardHeaderEditable = styled(CardHeader)`
  padding: 0;
  input {
    padding: ${props => props.theme.size.block.spacing / 4}em
      ${props => props.theme.size.block.spacing / 2}em;
  }
`
export const CardCaptionEditable = styled(TextareaWithHighlights)`
  ${CaptionStyles} ${CardCaptionStyles} font-style: italic;
`
export const CardButtonEditable = styled.input`
  ${ButtonStyles} ${CardButtonStyles} border: 0;
  user-select: text;
  outline: 0;
  width: 100%;
  cursor: text;
  &:active {
    background: initial !important;
    color: initial !important;
  }
`
