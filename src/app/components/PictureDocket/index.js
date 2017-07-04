// tools
import React from "react"

// components

// styles
import styled, { css } from "styled-components"
import Color from "color"


const ScreenSlicer = styled.div`
  background: ${ props => props.theme.color.foreground };
  color: ${ props => props.theme.color.background };
  width: 					100vw;
  max-width: 			100vw;

  ${ props => props.theme.size.breakpoint.min.l`
    margin-left:	calc(( -100vw + ${ props => props.theme.size.block.column.maxwidth.m }px )/2 - ${ props => props.theme.size.block.column.safety }em );
    & > aside {
      margin: 0 auto;
      max-width: ${ props => props.theme.size.block.column.maxwidth.m }px
    }
  `}
  ${ props => props.theme.size.breakpoint.min.xxl`
    margin-left:	calc(( -100vw + ${ props => props.theme.size.block.column.maxwidth.l }px )/2 - ${ props => props.theme.size.block.column.safety }em );
    & > aside {
      margin: 0 auto;
      max-width: ${ props => props.theme.size.block.column.maxwidth.l }px
    }
  `}

  & aside > header {
    padding-left: ${ props => props.theme.size.block.column.safety }em;
    & > a { right:  ${ props => props.theme.size.block.column.safety }em; }
  }
`

// return
export default props => {
	return (
		<ScreenSlicer>
      <aside>{ props.children }</aside>
    </ScreenSlicer>
	)
}
