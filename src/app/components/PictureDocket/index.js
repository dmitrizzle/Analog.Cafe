// tools
import React from "react"

// components

// styles
import styled from "styled-components"

const ScreenSlicer = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin: ${props => props.theme.size.block.spacing}em 0;
  clear: both;
  background: ${props => props.theme.color.background};

  & aside {
    border-bottom: ${props => props.theme.elements.thickBorder};
    & > header {
      padding: ${props => props.theme.size.block.spacing}em 0 0 0;
      ${props => props.theme.size.breakpoint.max.m`
      padding: ${props => props.theme.size.block.spacing}em 0
        0 ${props => props.theme.size.block.column.safety}em !important;
        `} box-shadow: none;
      margin-bottom: ${props => props.theme.size.block.spacing}em;
      border-bottom: ${props => props.theme.elements.thickBorder};
      & > a {
        position: absolute;
        right: 0;
        bottom: 0;
        top: inherit;
        ${props => props.theme.size.breakpoint.max.m`
        right: ${props => props.theme.size.block.column.safety}em !important;
          `};
      }
      & > h3 {
        font-size: ${props => props.theme.size.font.make.larger / 2}em;
        overflow: visible;
        &::before {
          content: none;
        }
      }
    }
  }

  ${props => props.theme.size.breakpoint.max.m`
    margin-left:  -${props => props.theme.size.block.column.safety}em;
    & aside > header {
      padding: ${props => props.theme.size.block.spacing}em ${props =>
    props.theme.size.block.column.safety}em ${props =>
    props.theme.size.block.column.safety}em;
      & > a {
        right: ${props => props.theme.size.block.spacing}em;
      }
    }
  `} ${props => props.theme.size.breakpoint.min.l`
    margin-left:	calc(( -100vw + ${props =>
      props.theme.size.block.column.maxwidth.m}px )/2 - ${props =>
  props.theme.size.block.column.safety}em );
    & > aside {
      margin: 0 auto;
      max-width: ${props => props.theme.size.block.column.maxwidth.m}px;
    }
  `} ${props => props.theme.size.breakpoint.min.xxl`
    margin-left:	calc(( -100vw + ${props =>
      props.theme.size.block.column.maxwidth.l}px )/2 - ${props =>
  props.theme.size.block.column.safety}em );
    & > aside {
      margin: 0 auto;
      max-width: ${props => props.theme.size.block.column.maxwidth.l}px;
    }
  `};
`

// return
export default props => {
  return (
    <ScreenSlicer>
      <aside>{props.children}</aside>
    </ScreenSlicer>
  )
}
