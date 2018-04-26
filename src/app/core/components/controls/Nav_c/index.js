import { connect } from "react-redux"
import React from "react"

import { CommonNav, ComposerNav } from "../Nav"
import { Connection, NavWrapper } from "../Nav/styles"
import { setIntent as setUserIntent } from "../../../../user/store/actions-user"

// components

const Nav = props => {
  if (props.top && !props.nav.location.top) return null
  if (props.bottom && !props.nav.location.bottom) return null
  return [
    <Connection
      key="Online_status"
      style={{
        display: props.user.connection.status === "offline" ? "block" : "none"
      }}
    >
      Offline
    </Connection>,
    <NavWrapper className="appNav" key="NavWrapper">
      {props.nav.view === "COMPOSER" ? (
        <ComposerNav
          composerStatus={props.composer.status}
          submissionStatus={props.submission.status}
          userStatus={props.user.status}
          userRole={props.user.info.role}
        />
      ) : (
        <CommonNav
          userStatus={props.user.status}
          userRole={props.user.info.role}
          userImage={props.user.info.image}
          userIntent={() => {
            props.user.intent.load !== "List" &&
              props.setUserIntent({ load: "List" })
          }}
        />
      )}
    </NavWrapper>
  ]
}

// connect with redux
const mapStateToProps = state => {
  return {
    nav: state.nav,
    composer: state.composer,
    submission: state.submission,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUserIntent: intent => {
      dispatch(setUserIntent(intent))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
