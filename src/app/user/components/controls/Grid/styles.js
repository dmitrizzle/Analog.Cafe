import styled, { css } from "styled-components"

import Button from "../../../../core/components/controls/Button/components/Button"
import Sidenote from "../../../../core/components/vignettes/Sidenote"

// css
const squreWidth = css`
  width: calc(
    100% / ${props => props.span || 3} -
      ${props => props.theme.size.block.border / 1.5}px
  );
`
export const GridContainer = styled.div`
  padding: 0;
  ${props => props.theme.size.breakpoint.max.m`
		padding: 0 ${props => props.theme.size.block.border}px;
	`};
`
export const GridRow = styled.div`
  display: flex;
  align-content: flex-start;
  align-items: stretch;
`
export const GridButton = styled(Button)`
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
export const GridButtonCaption = styled(Sidenote)`
  font-weight: 400;
  color: ${props => props.theme.color.background()};
  bottom: 0;
  position: absolute;
  right: ${props => props.theme.size.block.spacing / 2}em;
`
export const AspectRatio = styled.div`
  padding-top: 100%;
  & > * {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  & > img {
    background-color: rgba(44, 44, 44, 0.125);
  }
`
export const GridCaption = styled(Sidenote)`
  text-align: center;
  padding: ${props => props.theme.size.block.spacing / 2}em
    ${props => props.theme.size.block.spacing}em
    ${props => props.theme.size.block.spacing * 2}em;
`
