import React from "react"
import styled from "styled-components"

import Link from "../../Link"

const NavMiniWrapper = styled.div`
  overflow: scroll;
  min-width: 320px;
  margin: 0 -1.75em;
  > div {
    width: 32em;
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
  resources: {
    label: "Resources",
    icon: "❖",
    to: "/resources"
  },
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
