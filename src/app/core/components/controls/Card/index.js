import React from "react"

import ButtonGroupDivider from "../Button/components/ButtonGroupDivider"
import CardButton from "./components/CardButton"
import CardFigure from "./components/CardFigure"
import CardHeader from "./components/CardHeader"
import CardPopup from "./components/CardPopup"
import Spinner from "../../icons/Spinner"
import Subscribe from "../../../../user/components/forms/Subscribe"

export default props => {
  return (
    <CardPopup style={props.style}>
      {!props.headless && (
        <CardHeader
          error={props.error}
          stubborn={props.stubborn}
          buttons={props.buttons}
          title={props.title}
        />
      )}
      <CardFigure image={props.image} text={props.text} />
      {props.subscribeForm && [
        <Subscribe
          key="Card_subscribe"
          onClick={event => event.stopPropagation()}
          formLocation={props.subscribeFormLocation}
        />,
        <ButtonGroupDivider key="Card_divider" />
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
              {button.loading && <Spinner />}
              {button.text}
            </CardButton>
          ) : button && button.divider ? (
            <ButtonGroupDivider key={i} />
          ) : null
        })}
    </CardPopup>
  )
}
