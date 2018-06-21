import styled from "styled-components"

// NOTE: CSS properties are rendered in index.html as critical path CSS
export default styled.li`
  ${props =>
    props.status &&
    `
    overflow: hidden;
    height: ${props.theme.size.block.spacing /
      props.theme.size.font.make.smaller}em;
  `};
`
