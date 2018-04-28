import React from "react"

import {
  Card as CardElement,
  CardButton,
  CardCaption,
  CardHeader
} from "./styles"
import { PicturePlaceholder } from "../../vignettes/Picture/components/PicturePlaceholder"
import { QuickSubscribe } from "../../../../user/components/forms/Subscribe"
import { makeFroth } from "../../../../utils"
import ButtonGroupDivider from "../Button/components/ButtonGroupDivider"

// return
export const Card = props => {
  console.log(props)
  return (
    <CardElement style={props.style}>
      <CardHeader title={props.error && props.error}>
        <h3 onClick={event => event.stopPropagation()}>{props.title}</h3>
        {// Stubborn popup shows no close button but requires buttons within
        !(
          props.stubborn &&
          props.buttons &&
          Object.keys(props.buttons).length !== 0
        ) ? (
          <a href="#close" onClick={event => event.preventDefault()}>
            ✕
          </a>
        ) : null}
      </CardHeader>
      <figure onClick={event => event.stopPropagation()}>
        <PicturePlaceholder frothId={props.image}>
          <img
            src={makeFroth({ src: props.image, size: "s" }).src}
            alt="Card"
          />
        </PicturePlaceholder>
        <figcaption>
          <CardCaption
            style={{ padding: typeof props.text === "undefined" ? "0" : "" }}
          >
            {props.text}
          </CardCaption>
        </figcaption>
      </figure>
      {props.subscribeForm && [
        <QuickSubscribe
          key="CardQuickSubscribe"
          onClick={event => event.stopPropagation()}
        />,
        <ButtonGroupDivider key="CardQuickSubscribeDivider" />
      ]}
      {props.buttons &&
        Object.keys(props.buttons).length !== 0 &&
        props.buttons.map(function(button, i) {
          return button && button.to && button.text ? (
            <CardButton
              onClick={button.onClick}
              to={button.to}
              key={button.to}
              branded={button.branded ? true : null}
              inverse={button.inverse ? true : null}
              responsiveMobileOnly={button.responsiveMobileOnly ? true : null}
            >
              {button.text}
            </CardButton>
          ) : button && button.divider ? (
            <ButtonGroupDivider key={i} />
          ) : null
        })}
    </CardElement>
  )
}
