import React from "react"
import styled from "styled-components"

import Figure from "../../../../../core/components/vignettes/Picture/components/Figure"
import Link from "../../../../../core/components/controls/Link"

export const AccountBenifits = styled.ul`
  max-width: 19em;
  margin: 1.5em auto 0 !important;
  padding: 0.5em;
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
  <React.Fragment>
    <p style={{ textAlign: "center", marginBottom: "0" }}>
      <small>
        <strong>
          <Link
            to="#help"
            onClick={event => {
              event.preventDefault()
              props.getHint()
            }}
          >
            Help
          </Link>
        </strong>{" "}
        {props.stateSessionInfo.hasLoggedIn &&
        props.stateSessionInfo.loginMethod ? (
          <span>
            |{" "}
            <em>
              Hint: last time you used {props.stateSessionInfo.loginEmail}{" "}
              {props.stateSessionInfo.loginMethod}.
            </em>
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </small>
    </p>
    <div style={{ display: props.showHint ? "block" : "none" }}>
      <p>
        Your account is created automatically whenever you click either of the
        buttons above. You do not need to remember passwords. If you already
        have an account, simply use the same method to sign in as you did the
        first time – we’ll take you to your existing account. All accounts are
        secure and adhere to our strict{" "}
        <Link to="/privacy-policy">privacy policy</Link>.
      </p>
      <h3 id="analogue-reads">“Analogue Reads” Tuesdays.</h3>
      <p>
        <strong>A weekly email newsletter</strong> featuring a digest of new
        photo essays, reviews, and guides. Every Tuesday at 9AM EST.{" "}
        <Link to="/privacy">No spam</Link>. Free with every account. Unsubscribe
        anytime.
      </p>
      <Link
        to="#account"
        onClick={event => {
          event.preventDefault()
          window.scroll({
            top: 0,
            behavior: "smooth"
          })
        }}
      >
        <Figure src="image-froth_1600000_BJRvHFlv4" feature />
      </Link>
    </div>
  </React.Fragment>
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
          <Link
            to="#analogue-reads"
            onClick={event => {
              event.preventDefault()
              props.getHint()
              window.requestAnimationFrame(() => {
                const element = document.getElementById("analogue-reads")
                const y = element.getBoundingClientRect().top + window.scrollY
                window.scroll({
                  top: y,
                  behavior: "smooth"
                })
              })
            }}
          >
            newsletter
          </Link>
          .
        </li>
      </AccountBenifits>
    </React.Fragment>
  )
}
