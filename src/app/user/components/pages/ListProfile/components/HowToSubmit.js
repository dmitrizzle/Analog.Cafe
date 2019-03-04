import React from "react"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <ArticleSection>
      <h3>Your submissions.</h3>
      {/* <p>
        You’re now a full member of Analog.Cafe community, nice!{" "}
        <span role="img" aria-label="OK sign with fingers">
          👌
        </span>
      </p> */}
      <p>
        If you love shooting film and have a story to share, Analog.Cafe could
        be the place to publish it. Submissions are now accepted for essays and
        articles on or featuring film photography.{" "}
        <Link to="/submit">Details</Link>.
      </p>
      {/* <p>
        Until then, your{" "}
        <Link to="/favourites">
          <strong>Favourites</strong>
        </Link>{" "}
        well . There you can store a private list of
        articles which you{" "}
        <span style={{ color: "#ed236e", fontWeight: "700" }}>❤︎</span>
        ’d.
      </p> */}
      {/* <p>
        Don’t forget to checkout the{" "}
        <Link to="/resources">
          <strong>Resources</strong>
        </Link>{" "}
        page, where you may find lots of useful guides, printables, and secret
        essays, not available to non-members.{" "}
        <span role="img" aria-label="Wink, wink">
          😉
        </span>
      </p> */}
    </ArticleSection>
  )
}
