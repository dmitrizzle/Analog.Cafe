import { connect } from "react-redux"
import React from "react"

import { setUserIntent } from "../../../../user/store/actions-user"
import Footer from "../../icons/Decor/Footer"
import FooterMicro from "./components/FooterMicro"
import NavComposer from "./components/NavComposer"
import NavConnectionStatus from "./components/NavConnectionStatus"
import NavGeneral from "./components/NavGeneral"
import NavWrapper from "./components/NavWrapper"

const Nav = props => {
  if (props.top && props.nav.location.top)
    return [
      <NavConnectionStatus
        key="Online_status"
        style={{
          display: props.user.connection.status === "offline" ? "block" : "none"
        }}
      >
        Offline
      </NavConnectionStatus>,
      <NavWrapper className="appNav" key="NavWrapper">
        {props.nav.view === "COMPOSER" ? (
          <NavComposer
            composerStatus={props.composer.status}
            editorStatus={props.editor.status}
            userStatus={props.user.status}
            userRole={props.user.info.role}
          />
        ) : (
          <NavGeneral
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
  if (props.bottom && props.nav.location.bottom)
    return (
      <FooterMicro>
        <Footer />
      </FooterMicro>
    )
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    composer: state.composer,
    editor: state.editor,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
