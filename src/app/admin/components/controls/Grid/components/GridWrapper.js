import styled from "styled-components"

export default styled.div`
  padding: 0;
  ${props => props.theme.size.breakpoint.max.m`
		padding: 0 ${props => props.theme.size.block.border}px;
	`};
`
