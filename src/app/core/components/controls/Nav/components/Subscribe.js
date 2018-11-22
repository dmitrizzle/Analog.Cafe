import styled from "styled-components"

export default styled.div`
  width: 10em;
  position: absolute;
  border-radius: 0.33em;
  box-shadow: 0 1px ${props => props.theme.color.foreground()};
  color: ${props => props.theme.color.brand()};
  height: 0.65em;
  top: 5em;
  margin-left: calc(50vw - 24em);
  @media (max-width: 930px) {
    margin-left: calc(50vw - 20em);
  }
  z-index: 1;
  @media (max-width: 48em) {
    display: none;
  }
  a {
    font-style: italic;
    font-family: "Lora", Georgia, serif;
    display: block;
    background: ${props => props.theme.color.background()};
    width: 6.5em;
    text-align: center;
    margin: 0 auto -1em;
    height: 1.25em;
    text-decoration: none;
    border-radius: 0.15em;
  }
  a:active,
  a.active {
    background: ${props => props.theme.color.brand()};
  }
  a.active {
    color: ${props => props.theme.color.background()};
    box-shadow: 0 0 0 1px ${props => props.theme.color.foreground()};
  }
`
