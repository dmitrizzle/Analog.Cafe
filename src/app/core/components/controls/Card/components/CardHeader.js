import React from "react"

import HeaderSmall from "../../../vignettes/HeaderSmall"
import { withTheme } from "styled-components"

export const CardHeader = props => {
  const { theme } = props
  return (
    <HeaderSmall title={props.error && props.error} noStar={props.noStar}>
      <h3
        title={typeof props.title === "string" && props.title}
        onClick={event => event.stopPropagation()}
      >
        {props.titlePrefix && (
          <span style={{ color: theme.color.brand() }}>
            {props.titlePrefix}
          </span>
        )}
        {props.title}
      </h3>
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

export default withTheme(CardHeader)
