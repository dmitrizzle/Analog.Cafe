import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS,
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../constants/routes-article"
import { getSubmissionOrArticleRoute } from "./routes-article"

it("Generate submission path route from URI", () => {
  expect(
    getSubmissionOrArticleRoute(
      `${ROUTE_URL_ARTICLES}/take-me-to-to-the-home-page-3fhd`
    )
  ).toEqual({
    apiRoute: ROUTE_API_ARTICLES,
    pathname: ROUTE_URL_ARTICLES
  })
  expect(
    getSubmissionOrArticleRoute(
      `${ROUTE_URL_SUBMISSIONS}/take-me-to-to-the-home-page-3fhd`
    )
  ).toEqual({
    apiRoute: ROUTE_API_SUBMISSIONS,
    pathname: ROUTE_URL_SUBMISSIONS
  })
})
