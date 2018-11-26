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
  text-align: left;
  position: relative;
  padding: 0 0 0.5em;
  color: ${props => props.theme.color.foreground()};
`

export const CardSearchItem = styled(LinkButton)`
  ${styles};
  padding: 1em 1em 1em 2em;
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
    display: inline-block;
    text-align: left;
  }
  ::after {
    content: "";
    position: absolute;
    width: 1em;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 250ms;

    ${props =>
      props.image &&
      `
      background: url(${props.image});
      background-size: auto 100%;
      background-position: center;
    `};
  }
  :active {
    background: ${props => props.theme.color.background()};
  }
`
