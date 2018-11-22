import styled, { css } from "styled-components"

import LinkButton from "../../Button/components/LinkButton"

export const styles = css`
  max-width: 100%;
  margin: 0;
  border-radius: 0;
  &:active {
    box-shadow: 0 -1px 0 ${props => props.theme.color.foreground()};
  }
  ${props =>
    props.mobile === "on" && props.theme.size.breakpoint.min.l`display:none;`};

  ${props =>
    props.mobile === "off" && props.theme.size.breakpoint.max.m`display:none;`};
`

export default styled(LinkButton)`
  ${styles};
`

export const searchTextStyles = css`
  background: ${props =>
    props.theme.color.background(props.theme.opacity.most)};
  text-align: left;
  display: inline;
  position: relative;
  padding: 0.05em;
  color: ${props => props.theme.color.foreground()};
`

export const CardSearchItem = styled(LinkButton)`
  ${styles};
  padding: 1em;
  position: relative;
  div {
    font-size: 0.85em;
    ${searchTextStyles};
  }
  em {
    font-family: Lora, serif;
    font-size: 0.65em;
    font-weight: 400;
    ${searchTextStyles};
  }
  ::before {
    content: "";
    position: absolute;
    top: -4px;
    right: 0;
    bottom: -4px;
    left: 0;
    ${props =>
      props.image &&
      `
      background: url(${props.image});
      background-size: cover;
      filter: blur(3px);
    `};
  }
  :active {
    em,
    div {
      background: ${props => props.theme.color.highlight()};
    }
    ::before {
      background: transparent;
    }
  }
`
