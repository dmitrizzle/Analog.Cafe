import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/actions-storage"
import React from "react"
import styled from "styled-components"

import { ROUTE_URL_USER_LANDING } from "../../../../../user/constants/routes-session"
import Link from "../../Link"

const NavMiniWrapper = styled.div`
  overflow: scroll;
  min-width: 320px;
  margin: 0 -1.75em;
  > div {
    width: 37em;
    margin: 0 auto;
  }
`
const NavMiniIcon = styled.span`
  font-style: normal;
  padding: 0 0.25em 0 1.5em;
`

const ITEMS = {
  profile: {
    label: "Edit Profile",
    icon: "✱",
    to: `${ROUTE_URL_USER_LANDING}/edit`
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
  composer: {
    label: loadTextContent().length > 0 ? "Edit Draft" : "New Submission",
    icon: "✏︎",
    to: "/submit/compose"
  }
}
export default props => (
  <NavMiniWrapper>
    <div>
      {props.view !== "composer" ? (
        Object.values(ITEMS).map((item, i) => (
          <React.Fragment key={Object.keys(ITEMS)[i]}>
            <NavMiniIcon>{item.icon}</NavMiniIcon>
            <Link
              style={{
                fontWeight:
                  props.view === Object.keys(ITEMS)[i] ? 700 : undefined
              }}
              to={item.to}
            >
              {item.label}
            </Link>
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <NavMiniIcon>{ITEMS.submissions.icon}</NavMiniIcon>
          <Link to={ITEMS.submissions.to}>{ITEMS.submissions.label}</Link>
        </React.Fragment>
      )}
    </div>
  </NavMiniWrapper>
)
