import React from "react"
import styled from "styled-components"

export const AccountBenifits = styled.ul`
  max-width: 19em;
  margin: 1.5em auto 0 !important;
  padding: 0.5em;
  background: #2c2c2c;
  color: #fff;
  /* border-radius: 0.25em; */
  /* box-shadow: 0 1px 1px rgba(44,44,44,0.25), 0 0 0 1px rgba(44,44,44,0.125); */
  font-size: 0.85em;
  font-style: italic;
  li {
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
          <span className="highlight icon">❤</span> Vote for and save your
          favourites.
        </li>
        <li>
          <span className="icon">✒︎</span> Submit your work to get featured.
        </li>
        <li>
          <span className="icon">❖</span> Free printables, exclusives & email
          updates.
        </li>
      </AccountBenifits>
    </React.Fragment>
  )
}
