import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../../utils"
import { isForbidden } from "../../../../../user/utils/actions-session"
import { setModal } from "../../../../store/actions-modal"
import Link from "../../Link"

const NavMiniWrapper = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  min-width: 320px;
  margin: 0 -1.75em;
  > div {
    width: 32em;
    margin: 0 auto;
    ${props => props.theme.size.breakpoint.max.m`
      padding-left: 1em;
      width: 33.5em;
      `};
  }
`
const NavMiniIcon = styled.span`
  font-style: normal;
  padding: 0 0.25em 0 1.5em;
  &:first-child {
    padding-left: 0;
  }
`
const NavmMiniLink = styled(Link)`
  background: ${props => props.theme.color.background()};
`

const ITEMS = {
  mustReads: {
    label: "Must Reads",
    icon: "❖",
    to: "/must-reads"
  },
  favourites: {
    account: true,
    label: "Favourites",
    icon: "❤︎",
    to: "/favourites"
  },
  submissions: {
    account: true,
    label: "Submissions",
    icon: "✒︎",
    to: "/submissions"
  },
  // composer: {
  //   label: loadTextContent().length > 0 ? "Edit Submission Draft" : "New Submission",
  //   icon: "✏︎",
  //   to: "/submit/compose"
  // },
  profile: {
    account: true,
    label: "Edit Profile",
    icon: "✱",
    to: `/profile/edit`
  }
}
const NavMini = props => (
  <NavMiniWrapper>
    <div>
      {props.view !== "composer" ? (
        Object.values(ITEMS).map((item, i) => (
          <React.Fragment key={Object.keys(ITEMS)[i]}>
            <NavMiniIcon>{item.icon}</NavMiniIcon>
            <NavmMiniLink
              style={{
                fontWeight:
                  props.view === Object.keys(ITEMS)[i] ? 700 : undefined
              }}
              to={item.to}
              onClick={event => {
                GA.event({
                  category: "Navigation",
                  action: "NavMini",
                  label: item.label
                })

                console.log(item)

                item.account &&
                  props.user.status !== "ok" &&
                  isForbidden(event, props)
              }}
            >
              {item.label}
            </NavmMiniLink>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <NavMiniIcon>☞</NavMiniIcon>
          <NavmMiniLink to={"/submit"}>What is This?</NavmMiniLink>

          <NavMiniIcon>☁</NavMiniIcon>
          <NavmMiniLink to={"/zine/open-call-g99w"}>What to Write</NavmMiniLink>

          <NavMiniIcon>{ITEMS.submissions.icon}</NavMiniIcon>
          <NavmMiniLink to={ITEMS.submissions.to}>
            {ITEMS.submissions.label}
          </NavmMiniLink>
        </React.Fragment>
      )}
    </div>
  </NavMiniWrapper>
)

const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMini)
