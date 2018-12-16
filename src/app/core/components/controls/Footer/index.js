import { connect } from "react-redux"
import React from "react"

import Link from "../../controls/Link"

export const Footer = props => (
  <footer>
    {props.hr && <hr />}
    <p style={{ textAlign: "center", paddingTop: "1.5em" }}>
      <small>
        <Link to="/photo-essays">Photo Essays</Link> ・{" "}
        <Link to="/film-photography">Film Photography</Link> ・{" "}
        <Link to="/editorials">Editorials</Link> ・{" "}
        <Link to="/solo-projects">Solo Projects</Link> ・{" "}
        <Link to="/collaborations">Collaborations</Link>
        <br />
        <Link to="/about">About</Link> ・ <Link to="/submit">Submissions</Link>{" "}
        ・ <Link to="/privacy-policy">Privacy</Link> ・{" "}
        <Link to="/submit/rules">Rules</Link>
        <br />
        {props.user.status === "ok" ? (
          <React.Fragment>
            <Link to="/sign-out">Sign Out</Link> ・{" "}
            <Link to="/me">My Submissions</Link> ・{" "}
            <Link to="/submit/compose">Composer</Link> ・{" "}
            <Link to="/me/edit">Edit Profile</Link> ・{" "}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/sign-in">Sign In</Link>
            {"・ "}
          </React.Fragment>
        )}
        <strong>
          <Link to="/subscribe">Subscribe</Link>
        </strong>
      </small>
    </p>
  </footer>
)

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  null
)(Footer)
