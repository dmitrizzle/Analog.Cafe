import React from "react"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import Link from "../../../../../core/components/controls/Link"

export default () => (
  <ArticleSection>
    <p>
      The ❤ button on Analog.Cafe is a bookmarking tool that automatically
      builds your personal Favourites collection.
    </p>
    <p>
      Find your next favourite read in{" "}
      <strong>
        <Link to="/features">Features</Link>
      </strong>{" "}
      or:
    </p>
  </ArticleSection>
)
