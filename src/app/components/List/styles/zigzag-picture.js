// styles
import styled from "styled-components"

// constants
import { zigzagWidth, zigzagTopShim } from "./ul"

// css
export const ZigzagPicture = styled.div`
  min-width: ${zigzagWidth};
  background-color: rgba(44, 44, 44, 0.125);
  background-size: cover;
  background-position: top right;
  margin: 0 0 0 auto;
  ${props =>
    props.theme.size.breakpoint.max
      .l` display: none; `} ul:first-child li:first-child & {
    margin-top: -${zigzagTopShim + 4.5}em;
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
