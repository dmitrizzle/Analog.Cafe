import { connect } from "react-redux"
import React from "react"
import styled from "styled-components"

import { GA } from "../../../../../utils"
import { RHCP } from "../../../icons/group-beacons/Star"
import { setModal } from "../../../../store/actions-modal"
import Heart from "../../../icons/group-beacons/Heart"
import Link from "../../Link"
import Pen from "../../../icons/group-beacons/Pen"

const NavMiniWrapper = styled.div`
  margin: 0 -1.75em;
`

const NavmMiniLink = styled(props => <Link {...props} icon={undefined} />)`
  display: inline-block;
  background: ${props => props.theme.color.background(0.33)};
  margin-right: 0.25em;
  padding: 0 0.25em;
`

const iconStyles = { height: ".75em" }
const ITEMS = {
  favourites: {
    account: true,
    label: "Favourites",
    icon: props => <Heart style={props.style} />,
    to: "/favourites",
    noAccountTo: "/sign-in"
  },
  submissions: {
    label: "Submissions",
    icon: props => <Pen style={props.style} />,
    to: "/submissions",
    noAccountTo: "/submit"
  },
  profile: {
    account: true,
    label: "Profile & Settings",
    icon: props => <RHCP style={props.style} />,
    to: `/profile/edit`,
    noAccountTo: "/sign-in"
  }
}
const NavMini = props => (
  <NavMiniWrapper>
    {props.view !== "composer" ? (
      Object.values(ITEMS).map((item, i) => (
        <React.Fragment key={Object.keys(ITEMS)[i]}>
          {" "}
          <span style={{ display: "inline-block" }}>
            <item.icon
              style={{
                ...iconStyles,
                color:
                  props.view === Object.keys(ITEMS)[i] ? "#ed226e" : "#dbdbdb"
              }}
            />
            {""}
            <NavmMiniLink
              style={{
                fontWeight:
                  props.view === Object.keys(ITEMS)[i] ? 700 : undefined
              }}
              to={
                item.noAccountTo && props.user.status !== "ok"
                  ? item.noAccountTo
                  : item.to
              }
              onClick={event => {
                GA.event({
                  category: "Navigation",
                  action: "NavMini",
                  label: item.label
                })

                // item.account &&
                //   props.user.status !== "ok" &&
                //   isForbidden(event, props)
              }}
            >
              {item.label}
            </NavmMiniLink>
          </span>
        </React.Fragment>
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
