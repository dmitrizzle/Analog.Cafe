import React from "react"

import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Caption from "../../../../core/components/vignettes/Caption"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"

export default () => {
  return (
    <ArticleWrapper>
      <MetaTags
        metaTitle="Rules"
        metaDescription="By sending your submission you are agreeing to the following rules."
      />
      <HeaderLarge pageTitle="Rules" />
      <ArticleSection>
        <p>
          By sending your submission you are agreeing to the following rules:
        </p>
        <p>
          <strong>Copyright.</strong> Please note that besides the design and
          functionality of this website Analog.Cafe copyright also extends to
          the way your work is presented. Copy edits associated with your post,
          the brand name, font combinations and all design decisions regarding
          presenting your work belongs to Analog.Cafe.
        </p>
        <p>
          All copy-editing and touch-up work is done at Analog.Cafe editors’
          discretion. We may or may not accept your edit requests; all edits are
          done for the benefit of a good overall presentation of the whole
          publication, rather than just one piece. Analog.Cafe staff has limited
          time and resources, please keep that in mind when you make your
          requests.
        </p>
        <p>
          <strong>Release & Withdrawal.</strong> By submitting your work you
          give Analog.Cafe full, non-exclusive permission to exhibit it online
          on this website and any other location representing this website only
          (such as social accounts, other websites offline printed and display
          medium etc). Your work may be included (same general function as
          “retweeting” on Twitter or “sharing” on Facebook or any other social
          network) within other authors’ submissions with a clearly-visible link
          to your profile on Analog.Cafe; you are giving Analog.Cafe and the
          authors of Analog.Cafe to use your work in such manner (Analog.Cafe
          will make reasonable effort to ensure that all of such actions are
          respectful and in good faith). You are also granting Analog.Cafe
          editors the permission to modify your work (cropping, color and
          quality adjustments as well as copy editing and visual decorations).
          You are free to request an immediate withdrawal of your work at any
          time via email (see <Link to="/about">About</Link> page for contact
          info). We will comply as soon as possible, within two weeks of
          request; images which are used within other posts or are “suggested”
          images will take longer to remove (up to 30 days), since we’ll be
          forced to make arrangements that would satisfy all the authors and
          editors who have used that material. Analog.Cafe also reserves the
          right to remove your work at any time at editors’ discretion.
        </p>
        <p>
          <strong>Exclusivity.</strong> Your work is being exhibited on
          non-exclusive basis. This means that you are free to continue
          submitting it to any other gallery or website that you wish.
        </p>
        <p>
          <strong>Watermarks.</strong> If you choose to place watermarks on your
          images their aesthetics will be considered by Analog.Cafe editor.
          Meaning that tasteful, well-designed (this is up to Analog.Cafe
          editor’s discretion) watermarks are welcome; badly-designed,
          obstructive (this is up to Analog.Cafe editor’s discretion) watermarks
          might diminish your works’s chances to be accepted.
        </p>
        <p>
          <strong>Links to your work.</strong> All links directed outside of
          Analog.Cafe website will be set to &ldquo;no-follow.&rdquo;
        </p>
        <p>
          <strong>
            By using the Analog.Cafe{" "}
            <Link to={"/submit/compose"}>Composer</Link> tool you certify that
            the you are the owner of the copyrights or have a permission to use
            in the context all the images, text, files or other intellectual
            property that you submit to Analog.Cafe, and that you agree to the
            above terms, conditions and benefits.
          </strong>
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}
