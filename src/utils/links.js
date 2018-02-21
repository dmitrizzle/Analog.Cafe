// constants
import { ROUTE_APP_PRODUCTION_DOMAIN_NAME } from "../constants/app"
import { makeRelative as makeRelativeInit } from "@roast-cms/react-link-filter/dist/utils"

export const makeRelative = href =>
  makeRelativeInit(href, ROUTE_APP_PRODUCTION_DOMAIN_NAME)
