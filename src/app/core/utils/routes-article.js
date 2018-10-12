import { DOCUMENT_PLACEHOLDER } from "../constants/messages-article"
import {
  ROUTE_API_ARTICLES,
  ROUTE_API_SUBMISSIONS,
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../constants/routes-article"

export const getSubmissionOrArticleRoute = locationPathname => {
  return {
    pathname: locationPathname.includes(ROUTE_URL_SUBMISSIONS)
      ? ROUTE_URL_SUBMISSIONS
      : ROUTE_URL_ARTICLES,
    apiRoute: locationPathname.includes(ROUTE_URL_SUBMISSIONS)
      ? ROUTE_API_SUBMISSIONS
      : ROUTE_API_ARTICLES
  }
}

export const preloadConstructor = (loadedArticle, nextArticle) => {
  console.log(nextArticle)
  if (loadedArticle.slug === nextArticle.slug) return loadedArticle
  return {
    status: "loading",
    title: nextArticle.title,
    subtitle: nextArticle.subtitle,
    tag: nextArticle.tag,
    authors: nextArticle.authors,
    slug: nextArticle.slug,
    poster: nextArticle.poster,
    content: DOCUMENT_PLACEHOLDER
  }
}
