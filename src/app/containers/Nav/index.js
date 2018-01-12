// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { setIntent as setUserIntent } from "../../../actions/userActions"

// components
import { CommonNav, ComposerNav, NavWrapper } from "../../components/Nav"

// render
const Nav = props => {
  if (props.top && !props.nav.location.top) return null
  if (props.bottom && !props.nav.location.bottom) return null
  return (
    <NavWrapper className="appNav">
      {props.nav.view === "COMPOSER" ? (
        <ComposerNav
          draftStatus={props.composer.draftStatus}
          userStatus={props.user.status}
        />
      ) : (
        <CommonNav
          userStatus={props.user.status}
          userImage={props.user.info.image}
          userIntent={() => {
            props.user.intent.load !== "List" &&
              props.setUserIntent({ load: "List" })
          }}
        />
      )}
    </NavWrapper>
  )
}

// connect with redux
const mapStateToProps = state => {
  return {
    nav: state.nav,
    composer: state.composer,
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
