import styled from "styled-components"

export default styled.strong`
  ${props => props.theme.typography.title.auto} text-align: center;
  display: block;
  font-size: ${props => props.theme.size.font.make.smaller}em;
  position: relative;
  width: 6em;
  margin: 0 auto 0.5em;

  ${props =>
    props.homepage &&
    `
    &::before {
      content: "";
      width: 110%;
      left: -5%;
      height: 2px;
      bottom: -5px;
      background: ${props.theme.color.foreground()};
      position: absolute;
    }
  `};
`
