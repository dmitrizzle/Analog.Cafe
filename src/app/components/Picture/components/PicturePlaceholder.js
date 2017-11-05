// tools
import styled from "styled-components"
import { froth } from "../../../../utils/image-froth"

const isImage = src => {}
export const PicturePlaceholder = styled.div`
  padding-bottom: ${props =>
    froth({ src: props.frothId }).ratio
      ? Math.round(100 / froth({ src: props.frothId }).ratio, 3)
      : 0}%;
  background: #eee;
  height: ${props =>
    froth({ src: props.frothId }).ratio ? "0 !important" : "initial"};
  position: relative !important;
  display: ${props => !props.preserve && (props.frothId ? "block" : "none")};

  & > :first-child {
    width: 100%;
    height: ${props =>
      froth({ src: props.frothId }).ratio ? "100%" : "initial"};
    display: block;
    position: ${props =>
      froth({ src: props.frothId }).ratio ? "absolute" : "static"};
  }
`
