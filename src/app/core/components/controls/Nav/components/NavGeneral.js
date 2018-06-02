// NOTE: `className` props are used in index.html
import React from "react"

import { NavLink, NavLogoLink } from "./NavLinks"
import Modal from "../../Modal"
import NavAvatar from "./NavAvatar"
import NavItem from "./NavItem"
import NavLogo from "./NavLogo"

const NavLinkLabelMore = props => {
  return (
    <span>
      More… {props.userStatus === "ok" && <NavAvatar image={props.userImage} />}
    </span>
  )
}
export default props => {
  return (
    <ul
      onMouseOver={
        "ontouchstart" in document.documentElement ? null : props.userIntent
      }
    >
      <NavItem>
        <NavLink to={"/photo-essays"}>
          <span>Photo Essays</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={"/articles"}>
          <span>Articles</span>
        </NavLink>
      </NavItem>
      <NavItem prime center className="prime center">
        <NavLogoLink to={"/"} className="indexRouteLink">
          <NavLogo />
        </NavLogoLink>
      </NavItem>
      <NavItem prime right className="prime left">
        {props.userStatus === "ok" ? (
          <NavLink to={"/submit/compose"}>
            <span>Submit</span>
          </NavLink>
        ) : (
          <NavLink to={"/submit"}>
            <span>Submit</span>
          </NavLink>
        )}
      </NavItem>
      <NavItem prime left className="prime right">
        <Modal
          with={{
            info: {
              title: "More…",
              subscribeForm: props.userStatus !== "ok",
              subscribeFormLocation: "NavGeneral",
              buttons: [
                props.userStatus === "ok"
                  ? {
                      to: "/me",
                      text: "My Submissions",
                      branded: true
                    }
                  : null,
                props.userStatus === "ok"
                  ? {
                      to: "/me/edit",
                      text: "My Profile",
                      branded: true
                    }
                  : null,
                props.userRole === "admin"
                  ? {
                      to: "/me/admin",
                      text: "Admin",
                      branded: true
                    }
                  : null,
                props.userStatus === "ok"
                  ? {
                      to: "/sign-out",
                      text: "Sign Out",
                      inverse: true
                    }
                  : null,
                {
                  to: "/photo-essays",
                  text: "Photo Essays",
                  responsiveMobileOnly: true
                },
                {
                  to: "/editorials",
                  text: "Editorials"
                },
                {
                  to: "/guides",
                  text: "Guides"
                },
                {
                  to: "/reviews",
                  text: "Reviews"
                },
                {
                  to: "/stories",
                  text: "Stories"
                },
                { divider: true },
                {
                  to: "/collaborations",
                  text: "Collaborations"
                },
                {
                  to: "/solo-projects",
                  text: "Solo Projects"
                },
                { divider: true },
                {
                  to: "/about",
                  text: "About Analog.Cafe"
                }
              ]
            },
            id: "nav/more"
          }}
          style={{ textDecoration: "none", paddingRight: ".25em" }}
        >
          <NavLinkLabelMore
            userStatus={props.userStatus}
            userImage={props.userImage}
          />
        </Modal>
      </NavItem>
    </ul>
  )
}
