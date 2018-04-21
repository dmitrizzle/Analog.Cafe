import React from "react"

import {
  CardFlattened,
  CardCaptionEditable,
  CardButtonEditable,
  CardHeaderEditable
} from "./styles"
import { PicturePlaceholder } from "../../../../vignettes/Picture/components/PicturePlaceholder"
import {
  SUMMARY_LENGTH_MAX,
  TITLE_LENGTH_MAX
} from "../../../../../../user/constants/input"
import { SubtitleInput } from "../../../../../../user/components/forms/InputStyles"
import { froth } from "../../../../../utils/image-froth"

// return
export default props => {
  return (
    <CardFlattened>
      <CardHeaderEditable>
        <SubtitleInput
          placeholder="Your Name"
          value={props.title || ""}
          maxLength={TITLE_LENGTH_MAX}
          autoFocus
          onChange={event => props.changeTitle(event)}
          warning={props.warningTitle}
        />
      </CardHeaderEditable>
      <figure>
        <PicturePlaceholder frothId={props.image}>
          <img
            src={froth({ src: props.image, size: "s" }).src}
            alt="Profile avatar"
            onClick={() => props.changeImage()}
            style={{ cursor: "pointer" }}
          />
        </PicturePlaceholder>
        <figcaption>
          <CardCaptionEditable
            maxLength={SUMMARY_LENGTH_MAX}
            placeholder="Your short author bio goes here."
            onChange={event => props.changeText(event)}
            value={props.text || ""}
            warning={props.warningText}
          />
        </figcaption>
      </figure>
      <CardButtonEditable
        value={props.buttonText || ""}
        placeholder="Website"
        maxLength={SUMMARY_LENGTH_MAX}
        onChange={event => props.changeButton(event)}
        onFocus={() => props.focusButton()}
        onBlur={() => props.blurButton()}
      />
    </CardFlattened>
  )
}
