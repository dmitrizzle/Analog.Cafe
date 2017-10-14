// tools
import React from "react"
import Helmet from "../_async/AsyncHelmet"

// components
import { Article, Section } from "../ArticleStyles"
import { Button } from "../Button"
import { ModalDispatch } from "../../containers/Modal"
import Composer from "../../containers/Composer"
import Email from "../Email"

import {
  DEFAULT_COMPOSER_EDITOR_STATE,
  DEFAULT_COMPOSER_HEADER_STATE
} from "../../../constants/composer"
import emojis from "../../../constants/messages/emojis"
import { MESSAGE_HINT_SUBMIT_CONSENT } from "../../../constants/messages/hints"

const composerState = {
  raw: DEFAULT_COMPOSER_EDITOR_STATE,
  title: DEFAULT_COMPOSER_HEADER_STATE.title,
  subtitle: DEFAULT_COMPOSER_HEADER_STATE.subtitle
}
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
      <Composer composerState={composerState} />
      <ModalDispatch
        with={MESSAGE_HINT_SUBMIT_CONSENT}
        style={{ textDecoration: "none" }}
        wrapperElement="div"
      >
        <Button red>Send Submission {emojis.CHECKMARK}</Button>
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
