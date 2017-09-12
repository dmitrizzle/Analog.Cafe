// related constants
import { ROUTE_API_DOMAIN } from "./app"
import { ROUTE_AUTH_USER_LANDING } from "./user"

// api endpoints
export const ROUTE_SUBMISSION_API = ROUTE_API_DOMAIN + "/submissions"
export const ROUTE_UPLOAD_IMAGE_API = ROUTE_API_DOMAIN + "/submissions/upload"

// WebSocket
export const WEBSOCKET_UPLOAD_PROGRESS =
  process.env.REACT_APP_WEBSOCKET_UPLOAD_PROGRESS

// redirect rules
export const ROUTE_REDIRECT_AFTER_SUBMIT = ROUTE_AUTH_USER_LANDING
