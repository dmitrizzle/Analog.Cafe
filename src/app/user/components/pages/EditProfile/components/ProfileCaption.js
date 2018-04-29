import styled from "styled-components"

import { styles as CaptionStyles } from "../../../../../core/components/vignettes/Caption"
import { styles as CardCaptionStyles } from "../../../../../core/components/controls/Card/components/CardCaption"
import TextareaWithHighlights from "../../../forms/TextInput/components/TextareaWithHighlights"

export default styled(TextareaWithHighlights)`
  ${CaptionStyles} ${CardCaptionStyles} font-style: italic;
`
