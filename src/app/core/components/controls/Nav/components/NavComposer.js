import React from "react"

import {
  CARD_ALERTS,
  CARD_DIALOGUES
} from "../../../../../user/constants/messages-submission"
import { CARD_DIALOGUES as CARD_DIALOGUES_ADMIN } from "../../../../../admin/constants/messages-admin"
import { NavLogoLink } from "./NavLinks"
import Modal from "../../Modal"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"

// NOTE: `className` props are used in index.html
const NavLinkSendLabel = () => {
  return <span>Send</span>
}
const NavLinkSend = props => {
  return (
    <Modal
      unmarked
      with={
        props.editorStatus.id
          ? CARD_DIALOGUES_ADMIN.SAVE_EDITS
          : CARD_DIALOGUES.CONSENT
      }
      style={{ textDecoration: "none" }}
    >
      <NavLinkSendLabel />
    </Modal>
  )
}
export default props => {
  return (
    <ul>
      <NavItem status prime left className="prime left">
        <Modal
          unmarked
          with={CARD_ALERTS.AUTO_SAVE}
          style={{ textDecoration: "none" }}
        >
          {props.composerStatus === "ok" && <span>Draft Saved</span>}
          {props.composerStatus === "pending" && <span>Saving…</span>}
          {!props.composerStatus && <span>Draft</span>}
        </Modal>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem prime right className="prime right">
        <NavLinkSend
          userStatus={props.userStatus}
          userRole={props.userRole}
          editorStatus={props.editorStatus}
        />
      </NavItem>
    </ul>
  )
}
