import { ButtonStyles } from "@roast-cms/react-button-beans"
import styled from "styled-components"

import { CaptionStyles } from "../../../../../../core/components/vignettes/Caption"
import { styles as CardButtonStyles } from "../../../../../../core/components/controls/Card/components/CardButton"
import { styles as CardCaptionStyles } from "../../../../../../core/components/controls/Card/components/CardCaption"

import { TextareaWithHighlights } from "../../../../forms/InputStyles"
import CardHeader from "../../../../../../core/components/controls/Card/components/CardHeader"

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
