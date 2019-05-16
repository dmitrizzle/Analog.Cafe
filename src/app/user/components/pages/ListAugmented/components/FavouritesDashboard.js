import React from "react"

import { magazineSections } from "../../../../../core/components/pages/List/components/ListDescription"
import Link from "../../../../../core/components/controls/Link"
import Modal from "../../../../../core/components/controls/Modal"

export const UserFavouritesCTA = props => (
  <div style={{ zIndex: 10, position: "relative" }}>
    <Modal element="Button" with={magazineSections(props.location.pathname)}>
      Browse Everything
    </Modal>
    <small style={{ textAlign: "center", display: "block" }}>
      Visit our{" "}
      <Link to="https://www.etsy.com/ca/shop/AnalogCafeShop">Etsy</Link> shop!
    </small>

    <span style={{ textAlign: "center", display: "block" }}>
      Follow us on{" "}
      <strong>
        <Link to="https://twitter.com/analog_cafe">Twitter</Link>
      </strong>{" "}
      and{" "}
      <strong>
        <Link to="https://instagram.com/analog_cafe">Instagram</Link>
      </strong>{" "}
      for more.
    </span>
  </div>
)
