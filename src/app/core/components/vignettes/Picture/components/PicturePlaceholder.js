import styled from "styled-components"

import { makeFroth } from "../../../../../utils"

export const PicturePlaceholder = styled.div`
  padding-bottom: ${props =>
    makeFroth({ src: props.frothId }).ratio
      ? Math.round(100 / makeFroth({ src: props.frothId }).ratio, 3)
      : 0}%;
  background: #eee;
  height: ${props =>
    makeFroth({ src: props.frothId }).ratio ? "0 !important" : "initial"};
  position: relative !important;
  display: ${props => !props.preserve && (props.frothId ? "block" : "none")};

  & > :first-child {
    width: 100%;
    height: ${props =>
      makeFroth({ src: props.frothId }).ratio ? "100%" : "initial"};
    display: block;
    position: ${props =>
      makeFroth({ src: props.frothId }).ratio ? "absolute" : "static"};
  }
`
