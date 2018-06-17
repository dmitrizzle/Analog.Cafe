import React from "react"

import Figure from "../../../../../core/components/vignettes/Picture/components/Figure"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <div>
      <h3>How to submit.</h3>
      <Figure
        src="http://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif"
        alt="A short demo of the submission process to Analog.Cafe"
      >
        The “Composer” tool will help you create and send submissions.
      </Figure>
      <p>
        Click the “<Link to="/submit/compose">Submit Now</Link>” button and
        start writing your piece or copy-paste it from your editor. Feel free to
        format your work with titles, quotes, and links. Please make sure your
        images are 1800 pixels-wide for the best display quality. Take your time
        to double-check the grammar and spelling; your work is saved on your
        device so that you can come back another day to finish what you started.
        Click “Send.”
      </p>
      <p>
        After you <Link to="/sign-in">sign in or create an account</Link>, you
        can <strong>edit your profile</strong> by clicking “More…” on the
        top-right and selecting “My Profile.” There you can customize your
        avatar, bio, and add a link to your website or a social media page.
      </p>
    </div>
  )
}
