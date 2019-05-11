import React from "react"
import styled from "styled-components"

import Cube from "../../../../../core/components/icons/group-beacons/Cube"
import Heart from "../../../../../core/components/icons/group-beacons/Heart"
import Link from "../../../../../core/components/controls/Link"
import Modal from "../../../../../core/components/controls/Modal"
import Pen from "../../../../../core/components/icons/group-beacons/Pen"
import Point from "../../../../../core/components/icons/group-beacons/Point"

export const AccountBenifits = styled.ul`
  max-width: 19em;
  margin: 1.5em auto 0 !important;
  padding: 0.5em;
  font-size: 0.85em;
  font-style: italic;
  color: ${props => props.theme.color.foreground(0.45)};
  li {
    list-style-type: none;
    margin-bottom: 0.25em;
    padding: 0 !important;
    span {
      display: inline-block;
      width: 1.5em;
      color: ${props => props.theme.color.foreground(0.65)};
    }
    svg {
      height: 0.75em;
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
    </div>
  </React.Fragment>
)

export default props => {
  return (
    <React.Fragment>
      <AccountBenifits>
        <li>
          <span>
            <Cube />
          </span>{" "}
          Free{" "}
          <Modal
            element="a"
            with={{
              info: {
                image: "image-froth_1000000_SJ0QpHE-V",
                title: "Free PDF Downloads",
                text:
                  "Download anything you like from our collection of articles and guides on film photography techniques and theory.",
                buttons: [
                  {
                    to: "/features",
                    text: "Downloads & Features"
                  }
                ]
              },
              id: "hints/downloads"
            }}
          >
            downloads
          </Modal>
          .
        </li>
        <li>
          <span>
            <Point style={{ transform: "rotate(90deg)", margin: "0 .25em" }} />
          </span>{" "}
          Weekly{" "}
          <Modal
            element="a"
            with={{
              info: {
                image: "image-froth_1600000_BJRvHFlv4",
                title: "“Analogue Reads” Emails",
                text:
                  "A weekly email newsletter, delivered every Tuesday to all Analog.Cafe members. No spam.",
                buttons: [
                  {
                    to: "/privacy-policy",
                    text: "Privacy Policy"
                  }
                ]
              },
              id: "hints/composer"
            }}
          >
            newsletter
          </Modal>
          .
        </li>
        <li>
          <span>
            <Heart />
          </span>{" "}
          Save your{" "}
          <Modal
            element="a"
            with={{
              info: {
                image: "image-froth_915090_05378814ac7d4b9b9352b603f2d944de",
                title: "Favourites",
                text: "Save your favourite articles to read later."
              },
              id: "hints/favourites"
            }}
          >
            favourites
          </Modal>{" "}
          for later.
        </li>
        <li>
          <span>
            <Pen />
          </span>{" "}
          <Modal
            element="a"
            with={{
              info: {
                image: "image-froth_1499794_BkFUA89IV",
                title: "Call for entries.",
                text:
                  "Photos shot on film, 200+ words, your topic. No fees, no deadlines, easy submissions, free editorial reviews.",
                buttons: [
                  {
                    to: "/submit",
                    text: "Learn More"
                  }
                ]
              },
              id: "hints/submissions"
            }}
          >
            Submit
          </Modal>{" "}
          your work, get featured.
        </li>
      </AccountBenifits>
    </React.Fragment>
  )
}
