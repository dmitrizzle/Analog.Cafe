import styled from "styled-components"

export default styled.div`
  ${props => props.theme.typography.text.auto} ${props =>
    props.theme.size.font.auto} height: 7.5em;
  overflow: hidden;
  margin: -0.5em auto 0;

  max-width: ${props => props.theme.size.block.column.m}px;
  position: relative;
  z-index: ${props => props.theme.layer.card};

  ${props =>
    props.list &&
    props.list.author &&
    `
      & > div {
        overflow: visible;
        margin: 1.5em;
        display: flex;
        align-items: flex-start;
        overflow: scroll;
        height: 6em;
        span {
          color: #2c2c2c;
          border-radius: .3em;
          background: rgb(247, 247, 247);
          max-width: 720px;
          margin: 0 auto;
          display: block;
          line-height: 1.75em;
          padding: .5em;
          box-shadow: none;
        }
      }
  `};
`
