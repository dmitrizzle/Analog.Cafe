import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../../utils"
import { isForbidden } from "../../../../../user/utils/actions-session"
import { setModal } from "../../../../store/actions-modal"
import Link from "../../Link"

const NavMiniWrapper = styled.div`
  margin: 0 -1.75em;
`

const NavmMiniLink = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.color.background()};
  ::before {
    content: "${props => props.icon || ""}";
    text-decoration: none;
    display: inline-block;
    font-style: normal;
    padding: 0 0.25em 0 0;
  }
  ::after {
    content: "";
    display: inline-block;
    width: 1em
  }
`

const ITEMS = {
  favourites: {
    account: true,
    label: "Favourites",
    icon: "❤︎",
    to: "/favourites"
  },
  mustReads: {
    label: "Resources",
    icon: "❖",
    to: "/resources"
  },
  submissions: {
    account: true,
    label: "Submissions",
    icon: "✒︎",
    to: "/submissions"
  },
  profile: {
    account: true,
    label: "Profile & Settings",
    icon: "✱",
    to: `/profile/edit`
  }
}
const NavMini = props => (
  <NavMiniWrapper>
    {props.view !== "composer" ? (
      Object.values(ITEMS).map((item, i) => (
        <NavmMiniLink
          key={Object.keys(ITEMS)[i]}
          icon={item.icon}
          style={{
            fontWeight: props.view === Object.keys(ITEMS)[i] ? 700 : undefined
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
      ))
    ) : (
      <React.Fragment>
        <NavmMiniLink icon="☞" to={"/submit"}>
          What is This?
        </NavmMiniLink>
        <NavmMiniLink icon="☁" to={"/zine/open-call-g99w"}>
          What to Write
        </NavmMiniLink>
        <NavmMiniLink icon={ITEMS.submissions.icon} to={ITEMS.submissions.to}>
          {ITEMS.submissions.label}
        </NavmMiniLink>
      </React.Fragment>
    )}
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
