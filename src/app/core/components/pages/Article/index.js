import { Reader } from "@roast-cms/french-press-editor/dist/components/Reader"
import { connect } from "react-redux"
import Loadable from "react-loadable"
import React from "react"

import {
  Byline,
  Section,
  Article as ArticleElement
} from "../../styles/ArticleStyles"
import { HOST_PROD, TEXT_EMOJIS } from "../../../../constants"
import { ModalDispatch } from "../../controls/Modal"
import {
  ROUTE_API_AUTHORS,
  ROUTE_URL_ARTICLES,
  ROUTE_URL_SUBMISSIONS
} from "../../../constants/routes-article"
import { ROUTE_TAGS } from "../../../constants/routes-list"
import {
  fetchPage,
  setPage as setNextArticle
} from "../../../store/actions-article"
import {
  getAbsoluteURLPath,
  getSubmissionOrArticleRoute
} from "../../../utils/routes-article"
import {
  getAuthorListStringFromArray,
  getLeadAuthorObject
} from "../../../utils/messages-author"
import { getTitleFromSlug } from "../../../utils/messages-"
import { makeFroth } from "../../../../utils"
import ArticleActions from "../../controls/Card/components/ArticleActions"
import Heading from "../../vignettes/ArticleHeading"
import Helmet from "../../vignettes/Helmet"
import Link from "../../controls/Link"
import Picture from "../../vignettes/Picture_c"

// admin controls loader
const AdminControls = Loadable({
  loader: () =>
    import("../../../../admin/components/vignettes/ArticleControls"),
  loading: () => null,
  delay: 100
})

class Article extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      shareButtons: false,
      subscribeForm: false,
      tag: {
        name: "Post",
        route: "/"
      },
      publicationStatus: this.props.article.status
    }
  }

  fetchPage = () => {
    // do not fetch pages unless they are located in /zine or /submissions dir
    // otherwise on unmount the component will try to load any page, and return 404 errors
    if (
      !this.props.history.location.pathname.includes(ROUTE_URL_ARTICLES) &&
      !this.props.history.location.pathname.includes(ROUTE_URL_SUBMISSIONS)
    )
      return

    this.props.fetchPage({
      url:
        getSubmissionOrArticleRoute(this.props.history.location.pathname)
          .apiRoute +
        this.props.history.location.pathname.replace(
          getSubmissionOrArticleRoute(this.props.history.location.pathname)
            .pathname,
          ""
        )
    })

    // reset article actions menu
    this.setState({
      shareButtons: false,
      subscribeForm: false,
      publicationStatus: this.props.article.status
    })
  }

  makeTag = props => {
    const tag = props.article.tag
    if (typeof tag === "undefined") return
    this.setState({
      ...this.state,
      tag: {
        name:
          tag.charAt(0).toUpperCase() +
          getTitleFromSlug(tag, { titleCase: false }).slice(1),
        route: Object.keys(ROUTE_TAGS).find(key => ROUTE_TAGS[key] === tag)
      }
    })
  }
  componentDidMount = () => {
    this.unlisten = this.props.history.listen(() => this.fetchPage())
    this.fetchPage()
    this.makeTag(this.props)
    this.setState({
      adminControls: this.props.user.info.role === "admin"
    })
  }
  componentWillReceiveProps = nextProps => {
    this.makeTag(nextProps)
    this.setState({
      adminControls: nextProps.user.info.role === "admin",
      publicationStatus: nextProps.article.status
    })
  }
  componentWillUnmount = () => {
    this.unlisten()
  }
  handleSubscribeFormCallback = value => {
    this.setState({
      shareButtons: value,
      subscribeForm: !value
    })
  }
  handleRevealShareButtons = () => {
    this.setState({
      shareButtons: !this.state.shareButtons,
      subscribeForm: false
    })
  }
  handleShareOnFacebook = event => {
    event.preventDefault()
    window.open(
      "https://web.facebook.com/sharer.php?u=" +
        getAbsoluteURLPath(
          getSubmissionOrArticleRoute(this.props.history.location.pathname)
            .pathname,
          this.props.article.slug
        ),
      "_blank",
      "height=600,width=500"
    )
  }
  handleShareOnTwitter = event => {
    event.preventDefault()
    window.open(
      "https://twitter.com/share?url=" +
        getAbsoluteURLPath(
          getSubmissionOrArticleRoute(this.props.history.location.pathname)
            .pathname,
          this.props.article.slug
        ) +
        "&text=" +
        encodeURI(
          "“" +
            this.props.article.title +
            (this.props.article.subtitle
              ? " (" + this.props.article.subtitle + ")"
              : "") +
            "” by " +
            getAuthorListStringFromArray(this.props.article.authors)
        ) +
        "&via=analog_cafe",
      "_blank",
      "height=600,width=500"
    )
  }
  render = () => {
    return (
      <ArticleElement>
        <Helmet>
          <title>{this.props.article.title}</title>
          <meta name="description" content={this.props.article.summary} />
          <meta property="og:title" content={this.props.article.title} />
          <meta
            property="og:description"
            content={this.props.article.summary}
          />
          {this.props.article.poster && (
            <meta
              property="og:image"
              content={
                makeFroth({ src: this.props.article.poster, size: "m" }).src
              }
            />
          )}
        </Helmet>
        <Heading
          pageTitle={this.props.article.title}
          pageSubtitle={this.props.article.subtitle}
          title={this.props.article.error && this.props.article.error}
        >
          {this.props.article.authors &&
            this.props.article.authors[0].name && (
              <Byline>
                <Link to={this.state.tag.route}>{this.state.tag.name}</Link> by{" "}
                {getLeadAuthorObject(this.props.article.authors).id ? (
                  <ModalDispatch
                    with={{
                      request: {
                        url:
                          ROUTE_API_AUTHORS +
                          "/" +
                          getLeadAuthorObject(this.props.article.authors).id
                      }
                    }}
                  >
                    {getLeadAuthorObject(this.props.article.authors).name}
                  </ModalDispatch>
                ) : (
                  getLeadAuthorObject(this.props.article.authors).name
                )}
                {this.props.article.authors.length > 1 &&
                  ` with images by ${getAuthorListStringFromArray(
                    this.props.article.authors,
                    { ommitLeadAuthor: true, keepFullNames: true }
                  )}`}.
              </Byline>
            )}
          {this.props.article.submittedBy &&
            this.props.article.status !== "published" &&
            this.props.article.status !== "loading" && (
              <Byline>
                <br />
                <span style={{ fontStyle: "normal" }}>
                  {" "}
                  {TEXT_EMOJIS.WARNING}
                </span>{" "}
                This submission is only visible to you and the Analog.Cafe
                Editors.
              </Byline>
            )}
          {this.state.adminControls && <AdminControls />}
        </Heading>
        <Section articleStatus={this.props.article.status}>
          <Reader
            value={this.props.article.content.raw}
            options={{
              domain: HOST_PROD
            }}
            components={{
              Picture
            }}
          />

          {this.props.article.poster &&
            this.props.article.submittedBy && (
              <ArticleActions
                subscribeFormCallback={this.handleSubscribeFormCallback}
                revealShareButtons={this.handleRevealShareButtons}
                subscribeForm={this.state.subscribeForm}
                shareButtons={this.state.shareButtons}
                hideShareButtons={this.props.article.status !== "published"}
                shareOnFacebook={this.handleShareOnFacebook}
                shareOnTwitter={this.handleShareOnTwitter}
                nextArticle={this.props.article.next}
                thisArticle={this.props.article.slug}
                thisArticlePostDate={
                  this.props.article.date && this.props.article.date.published
                }
                nextArticleHeading={nextArticleHeading =>
                  this.props.setNextArticle({
                    title: nextArticleHeading.title,
                    subtitle: nextArticleHeading.subtitle,
                    authors: nextArticleHeading.authors,
                    slug: nextArticleHeading.slug,
                    poster: nextArticleHeading.poster,
                    tag: nextArticleHeading.tag
                  })
                }
              />
            )}
        </Section>
      </ArticleElement>
    )
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    article: state.article,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPage: request => {
      dispatch(fetchPage(request))
    },
    setNextArticle: nextArticle => {
      dispatch(setNextArticle(nextArticle))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Article)
// NOTE: withRouter() props inherited from /components/_screens/AppRoutes
