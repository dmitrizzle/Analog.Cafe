import { Button } from "@roast-cms/react-button-beans"
import Loadable from "react-loadable"
import React from "react"

const Spinner = Loadable({
  loader: () => import("../../../icons/Spinner"),
  loading: () => null,
  delay: 100
})

export default props => (
  <Button loaderComponent={props.loading ? Spinner : null} {...props}>
    {props.children}
  </Button>
)