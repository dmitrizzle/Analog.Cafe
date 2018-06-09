import { Button } from "@roast-cms/react-button-beans"
import React from "react"

import Spinner from "../../../icons/Spinner"

export default props => (
  <Button loaderComponent={props.loading ? Spinner : null} {...props}>
    {props.children}
  </Button>
)
