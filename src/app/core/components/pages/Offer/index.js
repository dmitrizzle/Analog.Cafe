import React from "react"
import styled from "styled-components"

import {
  DownloadArrow,
  DownloadModal
} from "../../../../user/components/pages/MustReads/components"
import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import Link from "../../controls/Link"

const OfferWrapper = styled(ArticleWrapper)`
  background: #f2f2f2;
  margin: 5em 0 -1.5em;
  padding-bottom: 3em;
  @media print {
    display: none;
  }
`

export default props => {
  return (
    <OfferWrapper>
      <ArticleSection>
        <h3>❖ Must Reads</h3>
        <p>
          <strong>
            <DownloadArrow />{" "}
            <DownloadModal>Film Grain Reference</DownloadModal>
          </strong>{" "}
          – printable shortlist of nine popular emulsions, their properties, and
          prices.
        </p>
        <p>
          <strong>
            <DownloadArrow />{" "}
            <DownloadModal>All Essential Guides</DownloadModal>
          </strong>{" "}
          – downloadable collection of film photography guides.
        </p>
        <p>
          <strong>
            <DownloadArrow /> <DownloadModal>Select Photo Essays</DownloadModal>
          </strong>{" "}
          – some of the best photo essays on Analog.Cafe.
        </p>
        <p>
          <strong>
            <Link to="/must-reads">More…</Link>
          </strong>
        </p>
      </ArticleSection>
    </OfferWrapper>
  )
}
