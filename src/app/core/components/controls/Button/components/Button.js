import { Button } from "@roast-cms/react-button-beans"
import Loadable from "react-loadable"
import React from "react"

const Loader = Loadable({
  loader: () => import("../../../icons/Loader"),
  loading: () => null,
  delay: 100
})

export default props => (
  <Button loaderComponent={props.loading ? Loader : null} {...props}>
    {props.children}
  </Button>
)
