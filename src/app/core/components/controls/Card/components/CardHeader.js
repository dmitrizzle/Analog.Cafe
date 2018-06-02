import React from "react"

import HeaderSmall from "../../../vignettes/HeaderSmall"

export default props => {
  return (
    <HeaderSmall title={props.error && props.error} noStar={props.noStar}>
      <h3 onClick={event => event.stopPropagation()}>{props.title}</h3>
      {!(
        props.stubborn &&
        props.buttons &&
        Object.keys(props.buttons).length !== 0
      ) ? (
        <a href="#close" onClick={event => event.preventDefault()}>
          ✕
        </a>
      ) : null}
    </HeaderSmall>
  )
}
