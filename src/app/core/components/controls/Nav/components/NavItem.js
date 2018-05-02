import styled from "styled-components"

// NOTE: these CSS properties are rendered in index.html as critical path CSS
// display: block;
// text-align: center;
// width: 7em;
//  ${props =>
//   props.center
//     ? props => props.theme.size.breakpoint.max.m`order: 1;`
//     : false} ${props =>
//     props.left
//       ? props => props.theme.size.breakpoint.max.m`order: 0;`
//       : false} ${props =>
//     props.right
//       ? props => props.theme.size.breakpoint.max.m`order: 2;`
//       : false} ${props =>
//     props.prime
//       ? false
//       : props => props.theme.size.breakpoint.max.m`display:none;`} ${props =>
//     props.indicator
//       ? `color: ` +
//         props.theme.color.foreground(props.theme.opacity.half)
//       : null};

export default styled.li`
  ${props =>
    props.status &&
    `
    overflow: hidden;
    height: ${props.theme.size.block.spacing /
      props.theme.size.font.make.smaller}em;
  `};
`
