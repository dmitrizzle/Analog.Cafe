// tools
import React from "react"
import Loadable from "react-loadable"
import {
  Button as ButtonInit,
  TinyButton as TinyButtonInit,
  LinkButton as LinkButtonInit
} from "@roast-cms/react-button-beans"

// components
import Link from "../Link"

// direct exports
export { ButtonStyles } from "@roast-cms/react-button-beans"

const Loader = Loadable({
  loader: () => import("../../_icons/Loader"),
  loading: () => null,
  delay: 100
})

export const Button = props => (
  <ButtonInit loaderComponent={props.loading ? Loader : null} {...props}>
    {props.children}
  </ButtonInit>
)
export const TinyButton = props => (
  <TinyButtonInit linkComponent={Link} {...props}>
    {props.children}
  </TinyButtonInit>
)
export const LinkButton = props => (
  <LinkButtonInit linkComponent={Link} {...props}>
    {props.children}
  </LinkButtonInit>
)
