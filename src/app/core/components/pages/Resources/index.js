import React from "react"
import styled from "styled-components"

import ArticleSection from "../Article/components/ArticleSection"
import ArticleWrapper from "../Article/components/ArticleWrapper"
import ContactInfo from "../../vignettes/ContactInfo"
import Figure from "../../vignettes/Picture/components/Figure"
import HeaderLarge from "../../vignettes/HeaderLarge"
import Link from "../../controls/Link"
import MetaTags from "../../vignettes/MetaTags"
import Modal from "../../controls/Modal"

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
export const ResourceStar = () => <span style={{ color: "#ed236e" }}>✯</span>

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
            <Link to="https://itunes.apple.com/us/podcast/analog-cafe-a-film-photography-podcast/id1452093436?mt=2&app=podcast">
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
            <Link to="/submit">Open Call</Link>
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
            <Link to="/zine/a-beginners-guide-to-film-photography-zq0f">
              A Beginner’s Guide to Film Photography
            </Link>
          </strong>{" "}
          – definitions, history, film <em>vs</em> digital, how the camera
          works, where to buy your first camera, how to develop your film.
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
          <ResourceStar /> Select Photo Essays
        </h3>
        <p>
          <strong>
            <Link to="/zine/ghetto-paradise-cambodia-p6pr">Cambodia</Link>
          </strong>{" "}
          – “With La Sardinia, a Bag of Candy, and a Handful of Weed.”
        </p>
        <p>
          <strong>
            <Link to="/zine/the-body-of-exile-k9gu">The Body of Exile</Link>
          </strong>{" "}
          – “The body of exile is a personal exploration that begins with an
          assertion that is followed by a question.”
        </p>
        <p>
          <strong>
            <Link to="/zine/expat-years-6sje">Resettle to Vancouver</Link>
          </strong>{" "}
          – “Emigration is a mix of fear, excitement, waiting, tears, and an
          accelerated exchange of goods.”
        </p>
        <p>
          <strong>
            <Link to="/zine/my-love-for-film-lw88">My Love for Film</Link>
          </strong>{" "}
          – “Family photo albums. I’m pretty certain this is where my love of
          film began.”
        </p>
        <p>
          <strong>
            <Link to="/zine/soi-dogs-w4mm">Soi Dogs of Chiang Mai</Link>
          </strong>{" "}
          – “Half domesticated and half feral, these mutts can be found
          sauntering narrow alleyways or napping on patches of shady concrete. ”
        </p>
        <p>
          <strong>
            <Link to="/zine/dwell-uw62">
              ‘Dwell’ And the Self-Portraiture Series
            </Link>
          </strong>{" "}
          – “In the summer of 2017, I was diagnosed with a rare autoimmune
          condition that was connected to the one word nobody ever wants to
          hear: cancer.”
        </p>
        <p>
          <strong>
            <Link to="/zine/hanoi-n8hh">Hanoi</Link>
          </strong>{" "}
          – “Hanoi’s architecture, transport, and people comprise an experience
          that embodies the ridiculous construction sprouts of northern China,
          the population density of Tokyo, entrepreneurial spirit of New York,
          and living standards of Southeast Asia.”
        </p>
        <p>
          <strong>
            <Link to="/zine/isaan-on-a-cloud-ge1v">Isaan, on a Cloud</Link>
          </strong>{" "}
          – “I ride up a two-lane strip, filled with twists, turns, dips, and
          hills. On my motorcycle, I lean into bends as deep as I can, until it
          feels like the wheels are about to slip.”
        </p>
        <p>
          <strong>
            <Link to="/zine/through-the-green-fuse-2ozf">
              Through the Green Fuse
            </Link>
          </strong>{" "}
          – “A high-tension automotive spark plug cable is welded to the
          aluminium plate to deliver the 40,000-volt electrical flow. In the
          darkroom, eight-by-ten-inch Fujichrome RTP colour transparency film is
          laid flat on the easel. The sculpted subject is then placed on top,
          with or without layers of diffusion material.”
        </p>
        <p>
          <strong>
            <Link to="/zine/open-your-eyes-tsk0">Open Your Eyes</Link>
          </strong>{" "}
          – “A project aimed at interacting with people and their dreams. A
          portraiture of calm, peace, and vulnerability. ‘Open Your Eyes’ is a
          series of photographs with the subjects’ eyes closed, thinking of
          their dreams.”
        </p>
        <p>
          <strong>
            <Link to="/zine/loy-krathong-f25c">Loy Krathong</Link>
          </strong>{" "}
          – “Loy Krathong is grandiose and prudent. It’s celebrated on the
          streets, with the family, surrounded by the hum of the crowd, looking
          into the void of the dark sky and black water. Lit up by a thousand
          twinkling candles.”
        </p>
        <p>
          <strong>
            <Link to="/zine/brighton-beach-jrwe">Brighton Beach</Link>
          </strong>{" "}
          – “Hey! I know what you’re doing! You’re not fooling anyone!”
        </p>

        <h3>
          <ResourceStar /> Camera & Film Reviews
        </h3>
        <p>
          <strong>
            <Link to="/zine/ricoh-caddy-8zf6">Ricoh Caddy</Link>
          </strong>{" "}
          – “My husband and I purchased the Caddy as a set along with a Canon
          Demi. After some online research, I was initially set on keeping the
          Demi. It was a cuter and lighter camera… But I chose the Ricco Caddy
          because it allows for more artistic control.”
        </p>

        <p>
          <strong>
            <Link to="/zine/kodak-ektachrome-vvyr">Kodak Ektachrome</Link>
          </strong>{" "}
          – “I felt like a kid in a candy store until I saw the handwritten sign
          that said ‘limit three rolls per customer.’”
        </p>
        <p>
          <strong>
            <Link to="/zine/voigtlander-vitessa-l-fzyi">
              Voigtländer Vitessa L
            </Link>
          </strong>{" "}
          – “Voigtländer Vitessa is for people interested in getting quality,
          sharp images on 35mm film, willing to sacrifice personal comfort for
          good looks and portability.”
        </p>
        <p>
          <strong>
            <Link to="/zine/diana-mini-7p61">Lomography Diana Mini</Link>
          </strong>{" "}
          – “The images it produces are far from sharp; there’s plenty of
          chromatic aberration, blur, and vignetting — especially at the edges.
          Though on a small screen or in print it doesn’t matter much. In fact,
          the soft focus of a plastic lens is part of the appeal, same with the
          dust, scratches, and random trash on the negatives.”
        </p>
        <p>
          <strong>
            <Link to="/zine/fed-5b-gz28">FED 5b With Industar-61</Link>
          </strong>{" "}
          – “Many people describe FED 5 as ugly, which is a contagious idea,
          considering how different it looks from the accepted norms. Yet, I
          believe that the visual design is one of its strong points.”
        </p>
        <p>
          <strong>
            <Link to="/zine/electro-35-gox3">Yashica Electro 35</Link>
          </strong>{" "}
          – “Electros are very fast and comfortable to use. The exposure is
          measured for you, though you still have your full creative control
          over the depth of field and the focus.”
        </p>
        <p>
          <strong>
            <Link to="/zine/testing-the-canon-sure-shot-af-7-in-chongquing-u79w">
              Testing the Canon Sure Shot AF-7 in Chongqing
            </Link>
          </strong>{" "}
          – “My first time playing with the Canon Sure Shot AF-7 was pretty
          successful, I think, considering I didn’t know if the camera even
          worked when I bought it from a charity shop in Nottingham.”
        </p>
        <p>
          <strong>
            <Link to="https://www.analog.cafe/zine/ql25-df78">QL25</Link>
          </strong>{" "}
          – “I’ve got this camera as a gift from a family friend; it’s been my
          primary shooter for almost a year, until I got my Electro 35.”
        </p>
        <p>
          <strong>
            <Link to="/zine/shooting-ilford-pan-400-in-shanghai-udfm">
              Shooting Ilford Pan 400 in Shanghai
            </Link>
          </strong>{" "}
          – “Pretty much everything about this set, from the shooting of the
          images to seeing how they turned out, and to the presenting it to you
          here… I like it.”
        </p>
        <p>
          <strong>
            <Link to="/zine/testing-the-olympus-supertrip-in-shanghai-sfd8">
              Testing the Olympus Supertrip in Shanghai
            </Link>
          </strong>{" "}
          – “I do have more favourable first impressions of the Canon Sure Shot
          AF-7 though. It feels better to shoot with and has so far yielded
          better images. However, the relative failures I had with this camera
          are all things I can learn from. So it’s still a winner.”
        </p>

        <h3>
          <ResourceStar /> Contact, Connect & Participate
        </h3>
        <p>
          Analog.Cafe is created by film photographers, artists, and writers of
          the internet. It’s maintained as an open-source project by{" "}
          <Link to="/is/dmitrizzle">Dmitri</Link>. You can learn more{" "}
          <strong>
            <Link to="/about">About Analog.Cafe</Link>
          </strong>
          .
        </p>
        <p>
          You can reach Dmitri anytime via email <ContactInfo /> or find him on{" "}
          <Link to="https://twitter.com/analog_cafe">Twitter</Link> or{" "}
          <Link to="https://instagram.com/analog_cafe">Instagram</Link>. If you
          would like to contact any of the individual contributors on
          Analog.Cafe, check out their profile; most authors leave their website
          or contact info there.
        </p>
        <p>
          Don’t forget to{" "}
          <strong>
            <Link to="/subscribe">subscribe</Link>
          </strong>{" "}
          to our weekly digest!
        </p>
        <Figure src="image-froth_1508014_SkwcnpuHE" feature />
      </ArticleSection>
    </ArticleWrapper>
  )
}
