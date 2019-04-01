import React from "react"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import Link from "../../../../../core/components/controls/Link"

export default () => (
  <ArticleSection>
    <p>
      The ❤ button on Analog.Cafe is a bookmarking tool that automatically
      builds your personal Favourites collection. Use it to save articles to
      read or share at a later time.
    </p>
    <p>
      Find your next favourite read. Browse Analog.Cafe Magazine sections or
      visit the{" "}
      <strong>
        <Link to="/">the front page</Link>
      </strong>{" "}
      for latest articles.
    </p>
  </ArticleSection>
)
