import React from "react"

import ArticleSection from "../../../../../core/components/pages/Article/components/ArticleSection"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <ArticleSection>
      <h3>Your submissions & public profile.</h3>
      <p>
        You’re now a full member of Analog.Cafe community, nice!{" "}
        <span role="img" aria-label="OK sign with fingers">
          👌
        </span>
      </p>
      <p>
        What you see above is your public profile. Make it beautiful with your
        photo, a short bio and a link to your website or social account.
      </p>
      <p>
        This page will become a lot more useful once you start submitting your
        essays and articles to be published on Analog.Cafe website. It’s easy to
        do; just follow{" "}
        <Link to="/submit">
          <strong>this link</strong>
        </Link>{" "}
        to get started.
      </p>
      <p>
        If not, your{" "}
        <Link to="/favourites">
          <strong>favourites</strong>
        </Link>{" "}
        will be a very useful page. There you can store a private list of
        articles which you{" "}
        <span style={{ color: "#ed236e", fontWeight: "700" }}>❤︎</span>
        ’d.
      </p>
      <p>
        You now also have full access to the{" "}
        <Link to="/resources">
          <strong>Resources</strong>
        </Link>{" "}
        page, where you may find lots of useful guides, printables, and secret
        essays, not available to non-members.{" "}
        <span role="img" aria-label="Wink, wink">
          😉
        </span>
      </p>
    </ArticleSection>
  )
}
