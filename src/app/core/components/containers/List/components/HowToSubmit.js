// tools
import React from "react"

// components
import { Section, Article } from "../../../stateless/ArticleStyles"
import Figure from "../../../stateless/Picture"
import { LinkButton } from "../../../stateless/_controls/Button"

// render
export default () => {
  return (
    <Article>
      <Section plain>
        <h3>How to submit your work.</h3>
        <p>
          Analog.Cafe lets you create and edit your submission using a tool
          called <em>Composer</em>.
        </p>
        <p>
          It’s recommended that you use latest Google Chrome, Safari or Firefox
          browser on your desktop computer to compose your submission.
        </p>
        <p>
          We review and edit all works before publishing. Once you send us your
          first submission it will appear on this page. As with most
          publications, not all submissions can be accepted.
        </p>
        <Figure
          src="image-froth_1101010_20d7f3aee5134e109123d1f7e132185c.gif"
          nocaption
          alt="Analog.Cafe Composer in action"
        />
        <p>
          While composing your submission keep in mind that it needs to have a
          concise and descriptive title and at least one image. You can add text
          formatting to your entry (such as <strong>bold</strong> and{" "}
          <em>italics</em>), links headings, and quotes. You can also move the
          images around, choose to have them full-screen or float left for the
          desired effect.
        </p>
        <p>
          When inserting images into your post you may also choose one of the
          recommended photographs that show up in a grid when you click the “Add
          Image” button. They’ve been created by other Analog.Cafe contributors
          and selected by the editor. Should you choose to use one, both of you
          will be credited appropriately with links to your profiles. You will
          also be listed under “Collaborations” catogory on the website.
        </p>
        <Figure
          src="image-froth_1498127_rJE9bhJNG"
          nocaption
          alt="Instant Collaborations"
        />
        <p>
          If you would like to offer your images up for being displayed in other
          authors’ publications click “Yes” for{" "}
          <strong>“Instant Collaborations”</strong> when you are submitting your
          work and we may include it in the image suggestions grid for you.
        </p>
        <p>
          You may also edit your profile image, bio and a link to your website
          or social media page. Just click on “More…” in the naviagation bar to
          find what you need.
        </p>
        <LinkButton to={"/submit/compose"} branded>
          Submit Now
        </LinkButton>
      </Section>
    </Article>
  )
}
