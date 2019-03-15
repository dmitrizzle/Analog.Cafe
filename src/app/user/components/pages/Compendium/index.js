import { connect } from "react-redux"
import React from "react"
import styled, { css } from "styled-components"

import { GA, makeFroth } from "../../../../utils"
import { setModal } from "../../../../core/store/actions-modal"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Byline from "../../../../core/components/vignettes/Byline"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import Link from "../../../../core/components/controls/Link"
import MetaTags from "../../../../core/components/vignettes/MetaTags"
import NavMini from "../../../../core/components/controls/Nav/components/NavMini"

export const COMPENDIUM_CONTENT = {
  downloads: [
    {
      account: true,
      type: "PDF",
      title: "A Beginner’s Guide to Film Photography",
      poster: "image-froth_2703927_BJFAQ5r7E",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/GUIDE-a-beginners-guide-to-film-photography-2019-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    },
    {
      account: true,
      type: "PDF",
      title: "Film Grain Reference",
      poster: "image-froth_836232_r1CTs7OvV",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/REFERENCE-film-grain-reference-2019-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    },
    {
      account: true,
      type: "PDF",
      title: "35mm Film Price Guide",
      poster: "image-froth_750000_SkhbW7eNN",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/GUIDE-35mm-film-price-guide-2019-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    },
    {
      account: true,
      type: "PDF",
      title: "Art as an Experience",
      poster: "image-froth_642341_HkkwT3XCQ",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/GUIDE-art-as-an-experience-2018-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    },
    {
      account: true,
      type: "PDF",
      title: "Loy Krathong",
      poster: "image-froth_1536155_H10rW53IG",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/PHOTOESSAY-loy-krathong-and-yi-peng-festival-2018-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    },
    {
      account: true,
      type: "PDF",
      title: "Resettle to Vancouver",
      poster: "image-froth_2066116_ByaU4Lyq7",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/PHOTOESSAY-resettle-to-vancouver-2018-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    },
    {
      account: true,
      type: "PDF",
      title: "Tropical Fruits",
      poster: "image-froth_1508587_BJfdlh8HQ",
      to:
        "https://s3.ca-central-1.amazonaws.com/analog.cafe/downloads/PHOTOESSAY-tropical-fruits-and-their-secrets-2018-Analog.Cafe.pdf?utm_source=Analog.Cafe+Weekly&utm_campaign=9a6e8ea693-RSS_EMAIL_ANALOGUE_READS_5&utm_medium=email&utm_term=0_f43e54afe2-9a6e8ea693-127381361"
    }
  ],
  guides: [
    {
      title: "Building an Instax Pinhole Camera",
      poster: "image-froth_1334223_HyxkFIXsPM",
      to: "/zine/building-an-instax-pinhole-camera-ixcd"
    },
    {
      title: "Experiments With Redscale Film and Lomography Cameras",
      poster: "image-froth_750747_SJIlc3U8f",
      to: "/zine/scarlet-summer-oyen"
    },
    {
      title: "How to Get Featured on Analog.Cafe",
      poster: "image-froth_1662577_SJAMyAO84",
      to: "/zine/open-call-g99w"
    },
    {
      title: "Film Photography Costs and Prices",
      poster: "image-froth_1507950_HkBtHJBPN",
      to: "/zine/film-photography-costs-and-prices-kd5j"
    },
    {
      title: "Where to Develop Film in Chiang Mai",
      poster: "image-froth_1822415_rJVLbcnUG",
      to: "/zine/where-to-develop-film-in-chiang-mai-xspe"
    },
    {
      title: "A Beginner’s Guide to Film Photography",
      poster: "image-froth_1507950_HyzuRgCKm",
      to: "/zine/a-beginners-guide-to-film-photography-zq0f"
    },
    {
      title: "35mm Film Price Guide",
      poster: "image-froth_1518843_B1skGpWWV",
      to: "/zine/35mm-film-price-guide-6zt1"
    },
    {
      title: "Art as an Experience",
      poster: "image-froth_1524778_S1-denLSX",
      to: "/zine/what-is-art-iu4s"
    }
  ],
  reviews: [
    {
      title: "Voigtländer Vitessa L",
      poster: "image-froth_1000340_S18bUcs27",
      to: "/zine/voigtlander-vitessa-l-fzyi"
    },
    {
      title: "Lomography Diana Mini",
      poster: "image-froth_1333333_Byl1aAiE7",
      to: "/zine/diana-mini-7p61"
    },
    {
      title: "Yashica Electro 35",
      poster: "image-froth_1454898_HytA81Oqf",
      to: "/zine/electro-35-gox3"
    },
    {
      title: "FED 5b With Industar-61",
      poster: "image-froth_1333333_ryImqJTuG",
      to: "/zine/fed-5b-gz28"
    },
    {
      title: "Ricoh Caddy",
      poster: "image-froth_1333333_rkn1ojPTX",
      to: "/zine/ricoh-caddy-8zf6"
    },
    {
      title: "Canon QL25",
      poster: "image-froth_1333333_BJYc4ZYuz",
      to: "/zine/ql25-df78"
    },
    {
      title: "Zeiss Accordion",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_644597_SygweVnqm.jpg",
      to: "https://www.analog.cafe/zine/on-a-roll-with-zeiss-hed2"
    },
    {
      title: "Canon Sure Shot AF-7",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1484058_HJcHsSFwz.jpg",
      to:
        "https://www.analog.cafe/zine/testing-the-canon-sure-shot-af-7-in-chongquing-u79w"
    },
    {
      title: "Olympus Supertrip",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1484072_3da5a59cfca54a44a065728dea6e4ffa.jpg",
      to:
        "https://www.analog.cafe/zine/testing-the-olympus-supertrip-in-shanghai-sfd8"
    }
  ],
  essays: [
    {
      title: "Cambodia With La Sardinia, a Bag of Candy, and a Handful of Weed",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1480456_S1sZFN5AQ.jpg",
      to: "http://localhost:3000/zine/ghetto-paradise-cambodia-p6pr"
    },
    {
      title: "Brighton Beach",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_602087_670d80ef74d74f668acb97213f4f6d30.jpg",
      to: "http://localhost:3000/zine/brighton-beach-jrwe"
    },
    {
      title: "Dwell",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_809568_r1-YJPxbv7.jpg",
      to: "http://localhost:3000/zine/dwell-uw62"
    },
    {
      title: "Through the Green Fuse",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_795000_S1GPYbXhf.jpg",
      to: "http://localhost:3000/zine/through-the-green-fuse-2ozf"
    },
    {
      title: "The Body of Exile",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1500000_SJezsTHK7.jpg",
      to: "http://localhost:3000/zine/the-body-of-exile-k9gu"
    },
    {
      title: "Resettle to Vancouver",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_713415_H1bXU_dY7.jpg",
      to: "http://localhost:3000/zine/expat-years-6sje"
    },
    {
      title: "My Love for Film",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1333333_ry6FU5ft7.jpg",
      to: "http://localhost:3000/zine/my-love-for-film-lw88"
    },
    {
      title: "Hanoi",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1000000_SJAzcSggQ.jpg",
      to: "http://localhost:3000/zine/hanoi-n8hh"
    },
    {
      title: "Isaan, on a Cloud",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_626918_Hk17qDaRG.jpg",
      to: "http://localhost:3000/zine/isaan-on-a-cloud-ge1v"
    },
    {
      title: "Soi Dogs Of Chiang Mai",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1494536_H1f8ugRBf.jpg",
      to: "http://localhost:3000/zine/soi-dogs-w4mm"
    },
    {
      title: "Open Your Eyes",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1500000_SJx0vUlswf.jpg",
      to: "http://localhost:3000/zine/open-your-eyes-tsk0"
    },
    {
      title: "Loy Krathong",
      poster:
        "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_520/image-froth_1536155_SygIztNd1G.jpg",
      to: "http://localhost:3000/zine/loy-krathong-f25c"
    }
  ]
}

export const Posters = styled.div`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  > div {
    display: flex;
  }
`
const posterDimensions = css`
  width: 6.93em;
  height: 11.7558em;
`
export const Poster = styled(Link)`
  ${posterDimensions} ${props => props.theme.typography.title.auto}
  ${"" /* padding: ${props => props.theme.size.block.padding / 2}em; */}
  margin: 0 ${props => props.theme.size.block.spacing * 0.5}em 0 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  color: ${props => props.theme.color.background()} !important;
  text-decoration: none;
  line-height: ${props => props.theme.size.block.spacing * 1.15}em;
  text-shadow: 1px 2px 0px ${props => props.theme.color.foreground()};
  font-size: ${props => props.theme.size.font.make.normal * 1.15}em;

  background: ${props =>
    props.theme.color.foreground(props.theme.opacity.least)}
    url(${props =>
      makeFroth({
        src: props.src,
        size: "m"
      }).src}) ${props => props.center && "center"}
     !important;
  background-size: cover !important;
  border-bottom: ${props => props.theme.elements.thickBorder};
  box-shadow: 0 0 0.5em
    ${props => props.theme.color.foreground(props.theme.opacity.least)};
  ${props => props.theme.size.breakpoint.max.m`
    border-radius:	${props => props.theme.effects.borderRadius.small}em;
  `};

  > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: ${props => props.theme.size.block.padding / 7}em;
    background: ${props =>
      props.theme.color.foreground(props.theme.opacity.half)};
  }
`

export const isForbidden = (event, props) => {
  event.preventDefault()
  props.setModal({
    info: {
      title: "Members Only Content",
      text: "You need to create or sign in to your free Analog.Cafe account.",
      buttons: [
        {
          to: `/sign-in`,
          text: "Sign In"
        },
        {
          to: `/sign-in#create`,
          text: "Create Free Account",
          branded: true
        }
      ]
    }
  })
}

export const Carousel = props => (
  <Posters>
    <div>
      {props.items.map(item => (
        <Poster
          src={item.poster}
          key={item.title}
          center={props.center}
          to={
            item.account
              ? props.user.status === "ok"
                ? item.to
                : "#forbidden"
              : item.to
          }
          onClick={event => {
            GA.event({
              category: "Navigation",
              action: "Compendium.poster",
              label: item.title
            })

            item.account &&
              props.user.status !== "ok" &&
              isForbidden(event, props)
          }}
        >
          <div>{item.title}</div>
        </Poster>
      ))}
    </div>
  </Posters>
)

export const Compendium = props => {
  return (
    <ArticleWrapper>
      <MetaTags metaTitle="Compendium" />
      <HeaderLarge pageTitle="Compendium">
        <Byline>
          <NavMini view="compendium" />
        </Byline>
      </HeaderLarge>
      <ArticleSection>
        <p>
          <strong>Compendium</strong>{" "}
          <em>n. – A collection of concise but detailed information.</em>
          <br />
          Downloads, member resources, guides, and exclusive essays.
        </p>
        <h3>Downloads</h3>
        <Carousel items={COMPENDIUM_CONTENT.downloads} {...props} />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Download our exclusive guides and photo essays (PDF) for offline
              reading. Formatted to be easily printed on any standard paper.
              You’ll need a{" "}
              <Link to="/sign-in">
                <strong>free Analog.Cafe Account</strong>
              </Link>
              .
            </em>
          </small>
        </p>

        <h3>Film Camera Reviews</h3>
        <Carousel items={COMPENDIUM_CONTENT.reviews} {...props} center />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Learn about the detailed, personal accounts with some of the most
              iconic film cameras and get acquainted with their triumphs and
              shortcommings.
            </em>
          </small>
        </p>

        <h3>Essential Guides</h3>
        <Carousel items={COMPENDIUM_CONTENT.guides} {...props} />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Understand film photography better, shop smarter, and get
              published with this collection of articles on this topic.
            </em>
          </small>
        </p>

        <h3>Best of Photo Essays</h3>
        <Carousel items={COMPENDIUM_CONTENT.essays} {...props} center />
        <p style={{ lineHeight: "1.2em" }}>
          <small>
            <em>
              Read the best-illustrated and most inspiring photo essays written
              by our community of guest and regular contributors.
            </em>
          </small>
        </p>
      </ArticleSection>
    </ArticleWrapper>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setModal: (info, request) => {
      dispatch(setModal(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compendium)
