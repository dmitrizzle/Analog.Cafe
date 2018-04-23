// constants
import { HOST_PROD } from "../constants/app"
import { makeRelative as makeRelativeInit } from "@roast-cms/react-link-filter/dist/utils"

export const makeRelative = href => makeRelativeInit(href, HOST_PROD)
