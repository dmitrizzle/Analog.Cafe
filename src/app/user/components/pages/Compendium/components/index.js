import React from "react"
import styled from "styled-components"

import Link from "../../../../../core/components/controls/Link"
import Modal from "../../../../../core/components/controls/Modal"

export const DownloadsCardStyles = styled.div`
  small {
    font-style: normal;
    line-height: 1.25em;
    display: block;
    margin-bottom: 1em;
  }
  span {
    font-style: normal;
  }
`

export const info = {
  title: "PDF Downloads",
  subscribe: true,
  image: "image-froth_2752266_rJ-QHbdBV",
  text: (
    <DownloadsCardStyles>
      <small>
        Get all the exclusive downloads + beautiful weekly emails.{" "}
        <Link to="/privacy-policy">No spam</Link>.
      </small>
       <span>➮</span> Film Grain Reference
      <br />
       <span>➮</span> All Essential Guides
      <br />
       <span>➮</span> Select Photo Essays
    </DownloadsCardStyles>
  ),
  formButtonText: "➮ Download",
  formClosedButtonText: "Download Links Sent."
}
export const DownloadModal = props => (
  <Modal
    unmarked
    element="a"
    with={{
      info,
      id: "campaign/downloads"
    }}
  >
    {props.children}
  </Modal>
)

export const DownloadArrow = () => <span style={{ color: "#ed236e" }}>➮</span>
