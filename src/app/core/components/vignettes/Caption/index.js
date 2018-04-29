import styled, { css } from "styled-components"

export const styles = css`
  ${props => props.theme.typography.text.auto} ${props =>
    props.theme.size.font.auto}
	display: 			block;
  font-size: ${props => props.theme.size.font.make.smaller}em !important;
  line-height: ${props => props.theme.size.font.make.smaller * 1.8}em;
  padding: 0;
`
export default styled.div`
  ${styles} font-variant: small-caps;
  text-align: justify;
`
