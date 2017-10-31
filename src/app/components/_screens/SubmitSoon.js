// tools
import React from "react"

// components
import Heading from "../ArticleHeading"
import { Section, Article } from "../ArticleStyles"
import SignInWithEmail from "../../containers/_forms/EmailReminder"
import Figure from "../Picture"
import Link from "../Link"

// render
export default props => {
  return (
    <Article>
      <Heading
        pageTitle="Submit"
        pageSubtitle="Film Photography, Essays & Articles"
      />
      <Section>
        <h3>Submissions winter 2017</h3>
        <p>
          This September we (the{" "}
          <Link to="https://github.com/dmitrizzle/Analog.Cafe/wiki/Contributors">
            dev
          </Link>{" "}
          team) are opening submissions to Analog.Cafe. Would you like a
          reminder on the day?
        </p>

        <SignInWithEmail />

        <hr />

        <h3>Some things to look forward to.</h3>
        <Figure
          src="image-froth_1076479_8f0a0ec6c4794688a66d79935fab2ca3.gif"
          nocaption
        />
        <p>
          All submissions will be accepted through{" "}
          <strong>
            Analog.Cafe <em>Composer</em> app
          </strong>. With it you’ll be able to drag & drop your images, add text
          and see your work exactly how it would appear on the website.
        </p>
      </Section>
    </Article>
  )
}
