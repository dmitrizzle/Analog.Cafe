// tools
import React from "react"

// components
import Heading from "../ArticleHeading"
import { Section, Article } from "../ArticleStyles"
import SignInWithEmail from "../../containers/_forms/EmailReminder"

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

        <SignInWithEmail />
      </Section>
    </Article>
  )
}
