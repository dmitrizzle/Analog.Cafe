import React from "react"
import styled from "styled-components"

import Link from "../../../../../core/components/controls/Link"

export const AccountBenifits = styled.ul`
  max-width: 19em;
  margin: 1.5em auto 0 !important;
  padding: 0.5em;
  font-size: 0.85em;
  font-style: italic;
  li {
    text-align: justify;
    list-style-type: none;
    margin-bottom: 0.25em;
    padding: 0 !important;
    .icon {
      font-style: normal;
    }
    .highlight {
      color: ${props => props.theme.color.brand()};
    }
  }
`

export const Hint = props => (
  <p style={{ textAlign: "center", marginBottom: "0" }}>
    <small>
      {props.stateSessionInfo.hasLoggedIn &&
      props.stateSessionInfo.loginMethod ? (
        <em>
          Hint: last time you used {props.stateSessionInfo.loginEmail}{" "}
          {props.stateSessionInfo.loginMethod}.
        </em>
      ) : (
        <span>&nbsp;</span>
      )}
    </small>
  </p>
)

export default props => {
  return (
    <React.Fragment>
      <AccountBenifits>
        <li>
          <span className="highlight icon">❤</span> Save your{" "}
          <Link to="/favourites">favourites</Link> for later.
        </li>
        <li>
          <span className="icon">✒︎</span> <Link to="/submit">Submit</Link> your
          work, get featured.
        </li>
        <li>
          <span className="highlight icon">❖</span> Free{" "}
          <Link to="/features">downloads</Link> & pre-releases.
        </li>
        <li>
          <span className="icon">☞</span> Weekly email{" "}
          {/* <Link
            to="#analogue-reads"
            onClick={event => {
              event.preventDefault();
              const element = document.getElementById("analogue-reads");
              const y = element.getBoundingClientRect().top + window.scrollY;
              window.scroll({
                top: y,
                behavior: "smooth"
              });
            }}
          > */}
          newsletter
          {/* </Link> */}.
        </li>
      </AccountBenifits>
    </React.Fragment>
  )
}
