import Loadable from "react-loadable"
import React from "react"

import { TEXT_EMOJIS } from "../../../../../constants"
import {
  getAuthorListStringFromArray,
  getLeadAuthorObject
} from "../../../../utils/messages-author"
import Byline from "../../../vignettes/Byline"
import Favourite from "../../../../../user/components/controls/Favourite"
import HeaderLarge from "../../../vignettes/HeaderLarge"
import Link from "../../../controls/Link"

const ArticleControls = Loadable({
  loader: () =>
    import("../../../../../admin/components/controls/ArticleControls"),
  loading: () => null,
  delay: 100
})

export default props => {
  return (
    <HeaderLarge
      pageTitle={props.article.title}
      pageSubtitle={props.article.subtitle}
      title={props.article.error && props.article.error}
    >
      {props.article.authors &&
        props.article.authors[0].name && (
          <Byline>
            By{" "}
            {getLeadAuthorObject(props.article.authors).id ? (
              <Link to={`/is/${getLeadAuthorObject(props.article.authors).id}`}>
                {getLeadAuthorObject(props.article.authors).name}
              </Link>
            ) : (
              getLeadAuthorObject(props.article.authors).name
            )}
            {props.article.authors.length > 1 &&
              ` with images by ${getAuthorListStringFromArray(
                props.article.authors,
                { ommitLeadAuthor: true, keepFullNames: true }
              )}`}
            .
          </Byline>
        )}
      {props.article.submittedBy &&
        props.article.status !== "published" &&
        props.article.status !== "loading" && (
          <Byline>
            <br />
            <span style={{ fontStyle: "normal" }}>
              {" "}
              {TEXT_EMOJIS.WARNING}
            </span>{" "}
            This submission is only visible to you and the Analog.Cafe Editors.
          </Byline>
        )}
      {props.user &&
        ((props.article.submittedBy &&
          props.article.submittedBy.id === props.user.info.id) ||
          props.user.info.role === "admin") && <ArticleControls />}
      <br />
      <Favourite />
    </HeaderLarge>
  )
}
