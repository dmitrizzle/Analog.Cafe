import styled from "styled-components"

export default styled.div`
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
