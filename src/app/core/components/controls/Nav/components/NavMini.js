import React from "react"
import styled from "styled-components"

import Link from "../../Link"

const NavMiniWrapper = styled.div`
  overflow: scroll;
  min-width: 320px;
  margin: 0 -1.75em;
  > div {
    width: 25em;
    margin: 0 auto;
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
  favourites: {
    label: "Favourites",
    icon: "❤︎",
    to: "/favourites"
  },
  submissions: {
    label: "Submissions",
    icon: "✒︎",
    to: "/submissions"
  },
  // composer: {
  //   label: loadTextContent().length > 0 ? "Edit Draft" : "New Submission",
  //   icon: "✏︎",
  //   to: "/submit/compose"
  // },
  profile: {
    label: "Edit Profile",
    icon: "✱",
    to: `/profile/edit`
  }
}
export default props => (
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
            >
              {item.label}
            </NavmMiniLink>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <NavMiniIcon>{ITEMS.submissions.icon}</NavMiniIcon>
          <NavmMiniLink to={ITEMS.submissions.to}>
            {ITEMS.submissions.label}
          </NavmMiniLink>

          <NavMiniIcon>☞</NavMiniIcon>
          <NavmMiniLink to={"/submit"}>Help</NavmMiniLink>
        </React.Fragment>
      )}
    </div>
  </NavMiniWrapper>
)
