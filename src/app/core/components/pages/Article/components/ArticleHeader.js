import Loadable from "react-loadable"
import React from "react"

import { ROUTE_API_AUTHORS } from "../../../../constants/routes-article"
import { TEXT_EMOJIS } from "../../../../../constants"
import {
  getAuthorListStringFromArray,
  getLeadAuthorObject
} from "../../../../utils/messages-author"
import Byline from "../../../vignettes/Byline"
import HeaderLarge from "../../../vignettes/HeaderLarge"
import Link from "../../../controls/Link"
import Modal from "../../../controls/Modal"

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
            <Link to={props.stateTag.route}>{props.stateTag.name}</Link> by{" "}
            {getLeadAuthorObject(props.article.authors).id ? (
              <Modal
                with={{
                  request: {
                    url:
                      ROUTE_API_AUTHORS +
                      "/" +
                      getLeadAuthorObject(props.article.authors).id
                  }
                }}
              >
                {getLeadAuthorObject(props.article.authors).name}
              </Modal>
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
      {props.stateAdminControls && <ArticleControls />}
    </HeaderLarge>
  )
}
