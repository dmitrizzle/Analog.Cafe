// tools
import React from "react"
import Helmet from "../_async/Helmet"

// components
import { Article, Section } from "../ArticleStyles"
import { Caption } from "../CaptionStyles"
import Composer from "../../containers/Composer"
import Link from "../_controls/Link"

const metaTitle = "Composer"
const metaDescription =
  "A tool to upload, edit and submit your photo essays and stories."

// render
export default props => {
  return (
    <Article>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>
      <Composer />
      <Section plain>
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
      </Section>
    </Article>
  )
}
