// tools
import React from "react"
import { NavLink } from "react-router-dom"

// helpers
import { parseHref } from "../../../utils/link-builder"

// return
export default props => {
  // all links within analog.cafe domain should become relative
  let address = parseHref(props.to)

  // external links
  if (address.includes("http"))
    return (
      <a
        href={address}
        target="_blank"
        rel="nofollow noopener noreferrer"
        title={address}
        {...props}
      >
        {props.children}
      </a>
    )
  else if (address.includes("#"))
    // anchor tags
    return (
      <a href={address} title={address} {...props}>
        {props.children}
      </a>
    )
  else if (address.startsWith("/"))
    // internal links (no title attribute necessary)
    return (
      <NavLink exact to={address} {...props}>
        {props.children}
      </NavLink>
    )
  else
    // fix invalid links
    return (
      <a
        href={"http://" + address}
        target="_blank"
        rel="nofollow noopener noreferrer"
        title={"http://" + address}
        {...props}
      >
        {props.children}
      </a>
    )
}
