import styled from "styled-components"
export default styled.div`
  width: 12em;
  position: absolute;
  border-radius: 0.33em;
  box-shadow: 0 1px #2c2c2c;
  color: #2c2c2c;
  height: 0.65em;
  top: 5em;
  margin-left: calc(50vw - 21em);
  opacity: 0.5;
  z-index: 1;
  @media (max-width: 48em) {
    display: none;
  }
  a {
    font-style: italic;
    font-family: "Lora", Georgia, serif;
    display: block;
    background: #fff;
    width: 6.5em;
    text-align: center;
    margin: 0 auto -1em;
    height: 1.25em;
    text-decoration: none;
  }
`
