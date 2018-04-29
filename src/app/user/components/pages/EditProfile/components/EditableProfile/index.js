import React from "react"

import {
  CardCaptionEditable,
  CardButtonEditable,
  CardHeaderEditable
} from "./styles"
import {
  INPUT_SUMMARY_LIMIT,
  INPUT_TITLE_LIMIT
} from "../../../../../../user/constants/rules-submission"
import { makeFroth } from "../../../../../../utils"
import CardIntegrated from "../../../../../../core/components/controls/Card/components/CardIntegrated"
import Placeholder from "../../../../../../core/components/vignettes/Picture/components/Placeholder"
import SubtitleInput from "../../../../forms/TextInput/components/SubtitleInput"

// return
export default props => {
  return (
    <CardIntegrated>
      <CardHeaderEditable>
        <SubtitleInput
          placeholder="Your Name"
          value={props.title || ""}
          maxLength={INPUT_TITLE_LIMIT}
          autoFocus
          onChange={event => props.changeTitle(event)}
          warning={props.warningTitle}
        />
      </CardHeaderEditable>
      <figure>
        <Placeholder frothId={props.image}>
          <img
            src={makeFroth({ src: props.image, size: "s" }).src}
            alt="Profile avatar"
            onClick={() => props.changeImage()}
            style={{ cursor: "pointer" }}
          />
        </Placeholder>
        <figcaption>
          <CardCaptionEditable
            maxLength={INPUT_SUMMARY_LIMIT}
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
        maxLength={INPUT_SUMMARY_LIMIT}
        onChange={event => props.changeButton(event)}
        onFocus={() => props.focusButton()}
        onBlur={() => props.blurButton()}
      />
    </CardIntegrated>
  )
}
