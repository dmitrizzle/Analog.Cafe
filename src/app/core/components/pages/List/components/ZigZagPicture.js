import styled from "styled-components"

import { VALUE_ZIGZAG_TOP_SHIM, VALUE_ZIGZAG_WIDTH } from "../constants"

export default styled.div`
  min-width: ${VALUE_ZIGZAG_WIDTH};
  background-color: rgba(44, 44, 44, 0.125);
  background-size: cover;
  background-position: top right;
  margin: 0 0 0 auto;
  ${props =>
    props.theme.size.breakpoint.max
      .l` display: none; `} ul:first-child li:first-child & {
    margin-top: -${VALUE_ZIGZAG_TOP_SHIM + 4.5}em;
  }

  clip-path: polygon(
    40% 0,
    73% 4%,
    100% 0,
    100% 96%,
    73% 100%,
    40% 96%,
    0 100%,
    0% 4%
  );
  ul:first-child li:first-child & {
    clip-path: polygon(
      40% 0,
      73% 4%,
      100% 0,
      100% 98%,
      73% 100%,
      40% 98%,
      0 100%,
      0% 4%
    );
  }
  filter: grayscale(100%);
`
