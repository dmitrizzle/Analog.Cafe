// tools
import React from "react"
import Helmet from "../_async/Helmet"

import { froth } from "../../../utils/image-froth"

// components
import Heading from "../ArticleHeading"
import { LinkButton, ButtonGroup } from "../Button"
import { Caption } from "../CaptionStyles"
import Figure from "../Picture"
import Link from "../Link"
import { Section, Article } from "../ArticleStyles"

const metaTitle = "Submit"
const metaDescription =
  "Submit film photography essays and articles to be featured on Analog.Cafe."

// render
export default props => {
  return (
    <Article>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          property="og:image"
          content={
            froth({
              src: "image-froth_1546790_b5ff5d48edf8488387d39f64e18b2916",
              size: "m"
            }).src
          }
        />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <Heading
        pageTitle="Submit"
        pageSubtitle="Film Photography, Essays & Articles"
      />
      <Section>
        <div style={{ textAlign: "center" }}>
          <LinkButton
            to={
              process.env.NODE_ENV === "development"
                ? "/submit/compose"
                : "/beta/compose"
            }
            red
          >
            Submit Now
          </LinkButton>
          <p>
            <em>- or -</em>
          </p>
          <p>
            <Link to="/sign-in">
              <strong>Sign in</strong>
            </Link>{" "}
            if you have an account.
          </p>
        </div>

        <Figure
          src="image-froth_1546790_b5ff5d48edf8488387d39f64e18b2916"
          feature
          nocaption
        />

        <h3>How to submit.</h3>
        <p>
          It&rsquo;s very easy to use the <strong>Analog.Cafe Composer</strong>.
          You can insert your images and edit text with ease. The Composer tool
          will do all the formatting and beautification for you.
        </p>
        <Figure
          src="image-froth_1076479_8f0a0ec6c4794688a66d79935fab2ca3.gif"
          nocaption
        />
        <p>
          <strong>Image Suggestions</strong> &mdash; when you upload your
          images, you will see <em>Image Suggestions:</em> hand-picked
          photographs that you can use freely in your submission.
        </p>
        <p>
          You can choose whether you want your photographs to be considered for
          Image Suggestions or not when you see “More Exposure?” question upon
          sending your submission.
        </p>

        <h3>How to get accepted.</h3>
        <p>
          Analog.Cafe focuses heavily on film photography as the subject of
          every submission. That being said, if your work suits the general
          style of the publication but doesn&rsquo;t use photographs shot on
          film it can still be accepted.
        </p>
        <p>Here is a list of formats submissions are typically accepted in:</p>
        <ul>
          <li>
            <strong>A Photo</strong> &mdash; one image, a title and perhaps a
            caption for the photograph.
          </li>
          <li>
            <strong>A Photo Essay</strong> &mdash; you can have one image with a
            story or a few images that make up a narrative.
          </li>
          <li>
            <strong>An Opinion/Article</strong> &mdash; your thoughts, advice,
            and opinions on film photography and art in general.{" "}
            <em>
              Please see <Link to="/articles">Articles</Link> section for
              examples of appropriate submissions.
            </em>
          </li>
        </ul>

        <p>
          For images, JPG and PNG formats are accepted, maximum 5MB per file.
          Please make sure the quality is good enough to display on large
          screens.
        </p>

        <h3>A few finer details.</h3>
        <p>
          When you submit your work, you must also agree to the below rules:
        </p>
        <Caption style={{ fontVariant: "normal" }}>
          <p>
            <small>
              <strong>Privacy.</strong> Analog.Cafe does not share or sell your
              private information (such as e-mail) to anyone outside of editing
              and admin staff at Analog.Cafe. Your email will be used for
              communication regarding your work and occasional or scheduled
              company newsletters. You can easily unsubscribe from the mailing
              list at any time. We do not use cookies unless required by the
              back-end software vendor to remember you as logged-in user.
              Analog.Cafe does not use targeted advertising. This online privacy
              policy applies only to information collected through the website
              or app and not to information collected elsewhere. By using
              Analog.Cafe, you consent to this website&rsquo;s privacy policy.
              This policy might be updated without notice; all changes would be
              posted on this page. This policy was last modified on July 8,
              2017.
            </small>
          </p>
          <p>
            <small>
              <strong>Links to your work.</strong> All links directed outside of
              Analog.Cafe website will be set to &ldquo;no-follow.&rdquo;
            </small>
          </p>
          <p>
            <small>
              <strong>Copyright.</strong> Please note that besides the design
              and functionality of this website Analog.Cafe copyright also
              extends to the way your work is presented. Copy edits associated
              with your post, the brand name, font combinations and all design
              decisions regarding presenting your work belongs to Analog.Cafe.
            </small>
          </p>
          <p>
            <small>
              All copy-editing and touch-up work is done at Analog.Cafe editors’
              discretion. We may or may not accept your edit requests; all edits
              are done for the benefit of a good overall presentation of the
              whole publication, rather than just one pice. Analog.Cafe staff
              has limited time and resources, please keep that in mind when you
              make your requests.
            </small>
          </p>
          <p>
            <small>
              <strong>Release & Withdrawal.</strong> By submitting your work you
              give Analog.Cafe full, non-exclusive permission to exhibit it
              online on this website and any other location representing this
              website only (such as social accounts, other websites offline
              printed and display medium etc). Your work may be respectfully
              included (same general function as “retweeting” on Twitter or
              “sharing” on Facebook or any other social network) within other
              authors’ submissions with a clearly-visible link to your profile
              on Analog.Cafe; you are giving Analog.Cafe and the authors of
              Analog.Cafe to use your work in such manner (Analog.Cafe will make
              reasonable effort to ensure that all of such actions are
              respectful and in good faith). You are also granting Analog.Cafe
              editors the permission to modify your work (cropping, color and
              quality adjustments as well as copy editing and visual
              decorations). You are free to request an immediate withdrawal of
              your work at any time via email (see{" "}
              <Link to="/about">About</Link> page for contact info). We will
              comply as soon as possible and within reason; images which are
              used within other posts or are “suggested” images (“suggested”
              images are recommended to authors within a grid of 8 when they
              click “Add Image” button) will take at least two weeks to remove,
              since we’ll be forced to make arrangements that would satisfy all
              the posts and authors who have used that material. Analog.Cafe
              also reserves the right to remove your work at any time at our
              discretion.
            </small>
          </p>
          <p>
            <small>
              <strong>Exclusivity.</strong> Your work is being exhibited on
              non-exclusive basis. This means that you are free to continue
              submitting it to any other gallery or website that you wish.
            </small>
          </p>
          <p>
            <small>
              <strong>Watermarks.</strong> If you choose to place watermarks on
              your images their aesthetics will be considered by Analog.Cafe
              editor. Meaning that tasteful, well-designed (this is up to
              Analog.Cafe editor’s discretion) watermarks are welcome;
              badly-designed, obstructive (this is up to Analog.Cafe editor’s
              discretion) watermarks might deminish your works’s chances to be
              accepted.
            </small>
          </p>
          <p>
            <small>
              <strong>
                By using the Analog.Cafe{" "}
                <Link
                  to={
                    process.env.NODE_ENV === "development"
                      ? "/submit/compose"
                      : "/beta/compose"
                  }
                >
                  Composer
                </Link>{" "}
                tool you certify that the you are the owner of the copyrights or
                have a permission to use in this context all the images, text,
                files or other intellectual property that you submit to
                Analog.Cafe, and that you agree to the above terms, conditions
                and benifits.
              </strong>
            </small>
          </p>
        </Caption>

        <ButtonGroup>
          <LinkButton
            to={
              process.env.NODE_ENV === "development"
                ? "/submit/compose"
                : "/beta/compose"
            }
            red
          >
            Submit Now
          </LinkButton>
          <p>
            <em>- or -</em>
          </p>
          <p>
            <Link to="/sign-in">
              <strong>Sign in</strong>
            </Link>{" "}
            if you already have an account.
          </p>
        </ButtonGroup>
      </Section>
    </Article>
  )
}
