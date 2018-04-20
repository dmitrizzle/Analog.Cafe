// tools
import styled from "styled-components"

// return
export const ModalOverlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => props.theme.layer.card};

  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`
