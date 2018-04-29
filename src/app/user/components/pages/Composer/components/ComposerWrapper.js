import React from "react"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../../core/components/pages/Article/components/ArticleWrapper"
import Caption from "../../../../../core/components/vignettes/Caption"
import Link from "../../../../../core/components/controls/Link"
import MetaTags from "../../../../../core/components/vignettes/MetaTags"

export default props => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Composer"
        metaDescription="A tool to upload, edit and submit your photo essays and stories."
      />
      {props.children}
      <ArticleSection plain>
        <Caption style={{ fontVariant: "normal" }}>
          <p>
            <small>
              All published articles are edited for grammar, style, and flow.
              Your content may be cut, rearranged, or modified (with care and
              respect towards your voice as an artist). Please also note that{" "}
              <strong style={{ textTransform: "uppercase" }}>
                you won’t be able to edit your submission after you send it
              </strong>. Please also be aware of the{" "}
              <Link to="/submit">rules</Link>.
            </small>
          </p>
        </Caption>
      </ArticleSection>
    </ArticleWrapper>
  )
}
