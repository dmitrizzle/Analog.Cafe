import React from "react"

import Figure from "../../../../../core/components/vignettes/Picture/components/Figure"
import Link from "../../../../../core/components/controls/Link"

export default () => {
  return (
    <div>
      <Figure
        src="https://res.cloudinary.com/analog-cafe/image/upload/v1528904759/image-froth_1010453_425a5704760c4879b31e008315c3047c.gif"
        alt="A short demo of the submission process to Analog.Cafe"
      >
        The “Composer” tool will help you create and send submissions.
      </Figure>
      <p>
        <em>
          <strong>First:</strong>
        </em>{" "}
        go to{" "}
        <em>
          <Link to="/submit/compose">Submit Now</Link>
        </em>{" "}
        page and start creating your submission with text and images. As you
        edit, your work is saved automatically.
      </p>
      <p>
        <em>
          <strong>Then:</strong>
        </em>{" "}
        make sure that your submission has at least one image: JPG or PNG. It
        must also include a title and text.
      </p>
      <p>
        <em>
          <strong>Finally:</strong>
        </em>{" "}
        click “send!”
      </p>
      <p>
        Our editors will go through your submission and make a few adjustments
        to make it read and look beautiful.
      </p>
    </div>
  )
}
