import React from "react"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <ArticleSection>
      <p>
        If you love shooting film and have a story to share, Analog.Cafe is the
        place to publish it. Submissions are now accepted for essays and
        articles on or featuring film photography.{" "}
        <Link to="/submit">Details</Link>.
      </p>
      <p>
        This is the page where your active or published submissions will appear.
      </p>
    </ArticleSection>
  )
}
