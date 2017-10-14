// tools
import React from "react"
import { Placeholder } from "slate-react"

// return
export default props => {
  const { node, state, parent } = props
  return (
    <Placeholder
      firstOnly={true}
      parent={parent}
      node={node}
      state={state}
      style={{ opacity: "0.65" }}
    >
      {props.children}
    </Placeholder>
  )
}
