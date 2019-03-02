import React from "react"

import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Terms of Use, Rules"
        metaDescription="By sending a submission and using Analog.Cafe website you are agreeing to the following rules."
      />
      <HeaderLarge pageTitle="Terms of Use, Rules" />
      <ArticleSection>
        <h3>Submissions</h3>
        <p>
          <em>
            By sending a <Link to="/submit">submission</Link> and using
            Analog.Cafe website and the{" "}
            <Link to={"/submit/compose"}>Composer</Link> tool, you are agreeing
            to the following rules:
          </em>
        </p>
        <p>
          Anyone who submits text, format, and images for publication on
          Analog.Cafe, using the above-mentioned Composer tool and submission
          page will be referred to here as an Author. Format is a layout of the
          submission work (links, highlights, quotes, how the images arranged,
          etc.) “Work” and “submission” are used interchangeably, meaning the
          same thing: uploading the text, format, and images to Analog.Cafe
          owned and/or rented servers. Editor(s) are the people or person who
          have provided edits to the submission and have the right and capacity
          to publish the work on Analog.Cafe website.
        </p>
        <p>
          Authors retain the complete copyright of their work. By submitting
          their work they give Analog.Cafe the right to exhibit it in accordance
          to the terms listed below.
        </p>
        <p>
          <strong>Release & Withdrawal.</strong> By submitting text, format, and
          images work Authors give Analog.Cafe full, non-exclusive permission to
          exhibit it online on this website and any other location representing
          this website (such as social accounts, other websites offline printed
          and display medium etc). Authors’ work may be included (same general
          function as “retweeting” on Twitter or “sharing” on Facebook or any
          other social network) within other Authors’ submissions with a link to
          the first Author’s profile on Analog.Cafe when clicked on an image and
          in the title of the post. Authors are giving Analog.Cafe and the
          Authors of Analog.Cafe to use their work in such manner (Analog.Cafe
          will make reasonable effort to ensure that all of such actions are
          respectful and in good faith, up to discretion of Analog.Cafe
          editors). Authors are also granting Analog.Cafe Editors the permission
          to modify the submissions (cropping, colour and quality adjustments as
          well as copy editing and visual decorations). Authors are free to
          request an immediate withdrawal of the work at any time via email (see{" "}
          <Link to="/about">About</Link> page for contact info). We will comply
          as soon as possible or within two weeks of request; images which are
          used within other posts or are “suggested” images will take longer to
          remove (up to 30 days), since we’ll be forced to make arrangements
          that would satisfy all the Authors and Editors who have used that
          material. Analog.Cafe also reserves the right to remove Authors’ work
          at any time at Editors’ discretion.
        </p>
        <p>
          <strong>Exclusivity.</strong> Authors’ work is being exhibited on a
          non-exclusive basis, unless otherwise specified. This means that you
          are free to continue submitting it to any other gallery or website
          that you wish.
        </p>
        <p>
          <strong>Watermarks.</strong> If you choose to place watermarks on
          Authors’ images their aesthetics will be considered by Analog.Cafe
          Editor. Meaning that tasteful, well-designed (this is up to
          Analog.Cafe Editor’s discretion) watermarks may be acceptable;
          badly-designed, obstructive (this is up to Analog.Cafe Editor’s
          discretion) watermarks might diminish Authors’ works’ chances to be
          accepted.
        </p>
        <p>
          <strong>Admission.</strong> There are no submission fees and no
          monetary compensation to the person submitting unless otherwise
          specified. Analog.Cafe editors select and publish submissions that
          they feel are a good fit – and reserve the right to decline any and
          all submissions. Analog.Cafe gives no guarantee or promise of any kind
          that a submission will be accepted, kept, or published.
        </p>
        <p>
          All copy-editing and touch-up work is done at Analog.Cafe Editors’
          discretion. Analog.Cafe may or may not accept Authors’ edit requests;
          all edits are done for the benefit of a good overall presentation of
          the whole magazine, rather than just one piece. Analog.Cafe staff has
          limited time and resources, please keep that in mind when making
          requests.
        </p>

        <h3>Terms of Use</h3>
        <p>
          <em>
            These terms of use apply to all Authors, users, and visitors to
            Analog.Cafe website, including Authors of software that downloads
            and/or interprets any part of this website.
          </em>
        </p>
        <p>
          <strong>Copyright.</strong> The design, code, and all working aspects
          of this website, as well as the way Authors’ work is presented is an
          intellectual property, the copyright of which belongs to Analog.Cafe,
          or its creator, Dmitri Tcherbadji, with an exception of edits made by
          editors other than Dmitri, in which case all copyright for these edits
          made by the editor specifically belongs to Analog.Cafe and the editor.
          Copy edits associated with Author’s post, the brand name, font
          combinations and all design decisions regarding presenting Author’s
          work belong to Analog.Cafe.
        </p>
        <p>
          <strong>Links to Authors’ work.</strong> All links directed outside of
          Analog.Cafe website will be set to &ldquo;no-follow.&rdquo;
        </p>

        <p>
          <strong>Guarantees and data storage.</strong> Analog.Cafe does not
          provide any guarantee of service, it is presented to you as-is. We are
          doing our best to keep all of the data as safe as reasonably possible,
          but there may be cases when issues may arise, which may cause loss and
          damage of Authors’ work. Analog.Cafe cannot take responsibility for
          these events. Analog.Cafe reserves the right to delete irrelevant,
          offensive content at the discretion of editors. Additionally,
          Analog.Cafe may delete, ban, or block abusive users.
        </p>
        <p>
          All Authors, users, and visitors to Analog.Cafe website, including
          Authors of software that downloads and/or interprets any part of this
          website must confine usage to the intended user interface, rendered by
          your browser and without plugins, devices, tools, or software that can
          alter its function in a way that distorts the default presentation,
          data, sounds, or any information provided by Analog.Cafe website.
          Prohibited use includes attempts to connect to the JSON API service
          and attempts to alter the behaviour of the website outside of its
          intended use for all or any users.
        </p>
        <p>
          For Privacy Policy please click <Link to="/privacy-policy">here</Link>
          .
        </p>
        <p>
          <strong>
            By using the Analog.Cafe Website you certify that you are the owner
            of the copyrights or have a permission to use in the context all the
            images, text, files or other intellectual property that you submit
            to Analog.Cafe, and that you agree to the above terms, conditions
            and benefits.
          </strong>
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}
