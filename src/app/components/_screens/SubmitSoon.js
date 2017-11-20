// tools
import React from "react"

// components
import Heading from "../ArticleHeading"
import { Section, Article } from "../ArticleStyles"
import MailChimpPrefill from "../../containers/_forms/MailChimpPrefill"

// render
export default props => {
  return (
    <Article>
      <Heading
        pageTitle="Submit"
        pageSubtitle="Film Photography, Essays & Articles"
      />
      <Section>
        <h3>Submissions start winter ‘17</h3>
        <p>
          This December we are opening submissions to Analog.Cafe. Would you
          like a reminder when this happens?
        </p>

        <MailChimpPrefill
          formUrl="https://cafe.us4.list-manage.com/subscribe/post?u=256339f7eafa36f2f466aca44&id=12d8a644fa&MERGE0="
          buttonText="Yes, Remind Me"
          autoFocus
        />
      </Section>
    </Article>
  )
}
