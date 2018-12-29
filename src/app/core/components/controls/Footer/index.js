import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { ROUTE_URL_USER_LANDING } from "../../../../user/constants/routes-session"
import Link from "../../controls/Link"

export const FooterContent = styled.p`
  text-align: center;
  padding-top: 1.5em;
  display: ${props => (props.showFooter ? "block" : "none")};
  ${props => props.theme.size.breakpoint.min.l`
  display: block;
  `};
`
export const FooterRevealButton = styled(Link)`
  text-decoration: none;
  ${props => props.theme.size.breakpoint.min.l`
  display: none;
  `};
`

export class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFooter: false
    }
  }
  toggleFooter = event => {
    event.preventDefault()
    this.setState({
      showFooter: !this.state.showFooter
    })
  }
  render = () => (
    <footer>
      <span
        style={{
          textAlign: "center",
          display: !this.state.showFooter ? "block" : "none"
        }}
      >
        <FooterRevealButton to="#footer" onClick={this.toggleFooter}>
          +
        </FooterRevealButton>
      </span>
      <FooterContent showFooter={this.state.showFooter}>
        <small>
          <Link to="/photo-essays">Photo Essays</Link> ・{" "}
          <Link to="/film-photography">Film Photography</Link> ・{" "}
          <Link to="/editorials">Editorials</Link> ・{" "}
          <Link to="/solo-projects">Solo Projects</Link> ・{" "}
          <Link to="/collaborations">Collaborations</Link>
          <br />
          <Link to="/about">About</Link> ・{" "}
          <Link to="/submit">Submissions</Link> ・{" "}
          <Link to="/privacy-policy">Privacy</Link> ・{" "}
          <Link to="/submit/rules">Rules</Link>
          <br />
          {this.props.user.status === "ok" ? (
            <React.Fragment>
              <Link to="/sign-out">Sign Out</Link> ・{" "}
              <Link to={ROUTE_URL_USER_LANDING}>My Submissions</Link> ・{" "}
              <Link to="/submit/compose">Composer</Link> ・{" "}
              <Link to="/profile/edit">Edit Profile</Link> ・{" "}
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
      </FooterContent>
    </footer>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  null
)(Footer)
