// tools
import React from "react"
import Link from "../Link"
import { froth } from "../../../utils/image-froth"
import LazyLoad from "react-lazyload"

// styles
import { Bleed } from "./styles/bleed"
import { Ul } from "./styles/ul"
import { Stats } from "./styles/stats"
import { Caption } from "./styles/caption"
import { ZigzagPicture } from "./styles/zigzag-picture"

// helper
import { datestamp } from "../../../utils/datestamp"

// constants
import { ROUTE_ARTICLE_DIR, SUMMARY_LENGTH_MAX } from "../../../constants/list"
import emojis from "../../../constants/messages/emojis"

// return
const ListSubtitle = props => {
  return (
    <span>
      <span>
        {props.title}
        &nbsp;
      </span>
      {props.subtitle && <span>({props.subtitle}) &nbsp;</span>}
    </span>
  )
}
export default props => {
  return (
    <Bleed>
      <Ul status={props.status}>
        {props.items.map((item, index) => {
          // NOTE: index is used to show high quality image for first item

          return (
            <LazyLoad
              unmountIfInvisible
              once
              offset={300}
              height={"100%"}
              key={item.id}
            >
              <li onMouseOver={props.listItemMouseOver}>
                <Link
                  to={item.slug && ROUTE_ARTICLE_DIR + "/" + item.slug}
                  onClick={() =>
                    props.nextArticleHeading({
                      title: item.title,
                      subtitle: item.subtitle,
                      author: item.author,
                      slug: item.slug,
                      poster: item.poster,
                      tag: item.tag
                    })
                  }
                >
                  <section>
                    <figure>
                      {item.type !== "placeholder" && (
                        <div
                          style={
                            item.poster && {
                              backgroundImage:
                                "url(" +
                                froth({
                                  src: item.poster,
                                  size: index ? "s" : "m"
                                }).src +
                                ")"
                            }
                          }
                          aria-label={item.title + " poster image"}
                        />
                      )}
                    </figure>
                    <h2 title={item.title}>{item.title}</h2>
                    <Caption status={props.status}>
                      <ListSubtitle
                        subtitle={item.subtitle}
                        title={item.title}
                      />
                      {/* Two versions of summary for different screens: long and short */}
                      <span className="long">
                        <span style={{ fontStyle: "normal" }}>
                          {emojis.PARAGRAPH}
                        </span>
                        {item.summary.substr(0, SUMMARY_LENGTH_MAX - 1) + "…"}
                      </span>
                      <span className="short">
                        <span style={{ fontStyle: "normal" }}>
                          {emojis.PARAGRAPH}
                        </span>
                        {item.summary.substr(
                          0,
                          SUMMARY_LENGTH_MAX / 1.6 -
                            (item.subtitle || "").length -
                            item.title.length -
                            1
                        ) + "…"}
                      </span>
                    </Caption>
                    <div>
                      <Stats {...props}>
                        {item.tag === "photo-essay" && item.stats.images === 1
                          ? "Single-Frame Narrative"
                          : (item.tag + "")
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, l => l.toUpperCase())}
                        {item.type !== "placeholder" &&
                          !props.private &&
                          (item.tag !== "photo-essay"
                            ? " | " +
                              Math.ceil(item.stats.words / 200) +
                              "-minute read"
                            : " | " +
                              item.stats.images +
                              " Image" +
                              (item.stats.images > 1 ? "s" : ""))}
                      </Stats>
                      {!props.private ? (
                        <em>
                          {item.author.name}
                          {item.type !== "placeholder" &&
                            " · " + datestamp(item["post-date"])}
                        </em>
                      ) : (
                        <em>
                          {item["post-date"] && datestamp(item["post-date"])}
                        </em>
                      )}
                    </div>
                  </section>
                  <ZigzagPicture
                    style={
                      item.type !== "placeholder" && item.poster
                        ? {
                            backgroundImage: `url(${
                              froth({
                                src: item.poster,
                                size: index ? "s" : "m"
                              }).src
                            })`
                          }
                        : null
                    }
                  />
                </Link>
              </li>
            </LazyLoad>
          )
        })}
      </Ul>
    </Bleed>
  )
}
