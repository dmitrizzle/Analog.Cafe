import React from "react"
import styled from "styled-components"

import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import Figure from "../../vignettes/Picture/components/Figure"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import MetaTags from "../../vignettes/MetaTags"
import Modal from "../../controls/Modal"

const DownloadsCardStyles = styled.div`
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

const DownloadModal = props => (
  <Modal
    unmarked
    element="a"
    with={{
      info: {
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
      },
      id: "modal/hints/vitessa-l"
    }}
  >
    {props.children}
  </Modal>
)

const DownloadArrow = () => <span style={{ color: "#ed236e" }}>➮</span>
const ResourceStar = () => <span style={{ color: "#ed236e" }}>✯</span>

export default props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Resources" />
      <HeaderLarge pageTitle="Resources" />
      <ArticleSection>
        <h3>
          <ResourceStar /> Analog.Cafe Podcast
        </h3>
        <p>
          If you’d like to <em>listen</em> to some of the articles on this
          website, subscribe on{" "}
          <strong>
            <Link to="https://itunes.apple.com/us/podcast/analog-cafe-a-film-photography-podcast/id1452093436">
              iTunes
            </Link>
          </strong>{" "}
          or{" "}
          <strong>
            <Link to="https://soundcloud.com/analog_cafe">SoundCloud</Link>
          </strong>
          .
        </p>

        <h3>
          <ResourceStar /> Downloads
        </h3>
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

        <h3>
          <ResourceStar /> Get Featured
        </h3>
        <p>
          <strong>
            <Link to="/zine/open-call-g99w">Write for Analog.Cafe</Link>
          </strong>{" "}
          – submit your photo essays, reviews, and articles here.
        </p>
        <p>
          <strong>
            <Link to="/zine/open-call-g99w">Open Call</Link>
          </strong>{" "}
          – background information and some ideas on how to get your submission
          accepted.
        </p>

        <Figure feature src="image-froth_2016050_H1rZzbOrE" />

        <h3>
          <ResourceStar /> Essential Guides
        </h3>
        <p>
          <strong>
            <Link to="/zine/a-beginner's-guide-to-film-photography-zq0f">
              A Beginner’s Guide to Film Photography
            </Link>
          </strong>{" "}
          – definitions, history, film <em>vs</em> digital, how the camera
          works, where to buy you first camera, how to develop your film.
        </p>
        <p>
          <strong>
            <Link to="/zine/35mm-film-price-guide-6zt1">
              35mm Film Price Guide
            </Link>
          </strong>{" "}
          – This guide will give you a solid idea on what a roll of film should
          cost.{" "}
        </p>
        <p>
          <strong>
            <Link to="/zine/what-is-art-iu4s">Art as an Experience</Link>
          </strong>{" "}
          – defining art and understanding how it applies to photography.
        </p>

        <h3>
          <span style={{ color: "#ed236e" }}>✯</span> Select Photo Essays
        </h3>
        <p>
          <strong>
            <Link to="/zine/ghetto-paradise-cambodia-p6pr">Cambodia</Link>
          </strong>{" "}
          – “With La Sardinia, a Bag of Candy, and a Handful of Weed.”
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}
