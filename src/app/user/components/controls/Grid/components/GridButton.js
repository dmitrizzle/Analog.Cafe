import styled, { css } from "styled-components"

import Button from "../../../../../core/components/controls/Button/components/Button"

const squreWidth = css`
  width: calc(
    100% / ${props => props.span || 3} -
      ${props => props.theme.size.block.border / 1.5}px
  );
`
export default styled(Button)`
  ${squreWidth} position: relative;
  padding: 0;
  overflow: visible;
  margin: 0 ${props => props.theme.size.block.border}px
    ${props => props.theme.size.block.border}px 0;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  ${"" /* for FireFox */}
  min-height: 5em;
  ${props => props.theme.size.breakpoint.min.m`min-height: 7em;`}
  ${props => props.theme.size.breakpoint.min.l`min-height: 11.5em;`}
  ${"" /* HACK: */}
  @-moz-document url-prefix() {
    overflow: hidden;
  }

  ${props =>
    props.label &&
    `
    &::after {
      content: "${props.label}";
      font-size: ${props.theme.size.font.make.tiny}em;
      height: ${props.theme.size.block.spacing * 1.5}em;
      padding: 0 ${props.theme.size.block.padding / 4}em ${props.theme.size
      .block.padding / 8}em;
      background: ${props.theme.color.brand()};
      color: ${props.theme.color.background()};
      position: absolute;
      top: ${props.theme.size.block.padding / 8}em;
      right: ${props.theme.size.block.padding / 8}em;
      border-radius: ${props.theme.effects.borderRadius.small()}em;
      box-shadow: 0 1px 1px
          ${props.theme.color.foreground(props.theme.opacity.least * 2)},
        0 0 0 1px
          ${props.theme.color.foreground(props.theme.opacity.least)};
    }
  `}

  img {
    width: 100%;
    height: auto;
    border-radius: ${props => props.theme.effects.borderRadius.small}em;
  }
  &:last-child {
    margin-right: 0;
  }
  ${props => props.theme.size.breakpoint.max.m`
  & span {
    display: none;
  }`} ${props => props.theme.size.breakpoint.max.xs`
    margin-left: 0 !important;
    border-radius: 		${props => props.theme.effects.borderRadius.small}em;
  `};
`
