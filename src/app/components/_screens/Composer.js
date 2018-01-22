// tools
import React from "react"
import Helmet from "../_async/Helmet"

// components
import { Article, Section } from "../ArticleStyles"
import { ModalDispatch } from "../../containers/Modal"
import Composer from "../../containers/Composer"
import { Email } from "../_rt-snippets"

import emojis from "../../../constants/messages/emojis"
import { MESSAGE_HINT_SUBMIT_CONSENT } from "../../../constants/messages/hints"

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
      <ModalDispatch
        with={MESSAGE_HINT_SUBMIT_CONSENT}
        wrapperElement="Button"
        red
      >
        Send Submission {emojis.CHECKMARK}
      </ModalDispatch>
      <Section plain>
        <p style={{ textAlign: "center" }}>
          <em>
            If you’re having trouble using this tool, please email <Email />
          </em>
        </p>
      </Section>
    </Article>
  )
}
