import ContactInfo from "../../../../core/components/vignettes/ContactInfo"

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
        metaTitle="Privacy Policy"
        metaDescription="Privacy policy employed on Analog.Cafe"
      />
      <HeaderLarge pageTitle="Privacy Policy" />
      <ArticleSection>
        <p>
          Analog.Cafe does not share or sell your private information (such as
          e-mail) to anyone outside of editing and admin staff at Analog.Cafe.
          Your email will be used for communication regarding your work and
          occasional or scheduled company newsletters. If you are a part of an
          email list, you can easily unsubscribe at any time via link in the
          footer of the email. Some emails are a part of the system (like
          notificatons sent at the time of publication to all authors). Those
          emails can can only be unsubscribed from when you delete your account
          on Analog.Cafe server.
        </p>
        <p>
          You can cancel your account at any time by sending a request to{" "}
          <ContactInfo />. Analog.Cafe will comply with your request within a
          week. If you want your work to be removed from Analog.Cafe website,
          please send a separate request.
        </p>
        <p>
          If you have an account with Analog.Cafe (separate from email list
          subscription), a token is stored on your device that verifies your
          identity to the server. It is not used to track your behaviour.
          Additionally, Analog.Cafe may store textual data in variety of forms
          on your device that lets you store your submissions in your browser
          and resume them even when you are offline. Analog.Cafe does not use
          that information to track your behaviour. Analog.Cafe can not see the
          content of your token or submission data. Analog.Cafe does not
          directly use “cookie” technology.
        </p>
        <p>
          Analog.Cafe uses Google Analytics, which in-turn anonymously tracks
          your browsing behaviour and adheres to it’s own{" "}
          <Link to="https://policies.google.com/privacy">privacy policy</Link>.
          You can opt-out by installing a plugin on your browser or switching
          the settings of your OS. A service called Cloudinary that we use to
          deliver high-quality images may track your activity according to their{" "}
          <Link to="https://cloudinary.com/privacy">privacy policy</Link>.
        </p>
        <p>
          This online privacy policy applies only to information collected
          through the website or app and not to information collected elsewhere.
          By using Analog.Cafe, you consent to this website&rsquo;s privacy
          policy. This policy might be updated without notice; all changes would
          be posted on this page. This policy was last modified on June 14,
          2018.
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}
