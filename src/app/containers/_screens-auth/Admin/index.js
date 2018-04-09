// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { fetchImageList } from "../../../../actions/composerActions"

// components
import Forbidden from "../../_screens-errors/Forbidden"

import Heading from "../../../components/ArticleHeading"
import { Button } from "../../../components/_controls/Button"
import { ButtonStrip, Item } from "../../../components/_controls/ButtonStrip"
import { Article, Section } from "../../../components/ArticleStyles"

import {
  GridButtonImage,
  GridContainer,
  GridRow
} from "../../../components/Grid"

const IMAGES_PER_ROW = 4
const IMAGES_PER_PAGE = 16
let rows = []

// render
class Admin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imageList: {
        page: 2,
        options: {
          featured: false,
          fullConsent: false,
          itemsPerPage: IMAGES_PER_PAGE
        }
      }
    }
  }

  // load images list
  componentDidMount = () => {
    // get featured collab images
    this.props.fetchImageList(this.state.imageList.options)
  }
  handleImagesLoadMore = () => {
    this.incrementPage() &&
      this.props.fetchImageList(
        this.state.imageList.options,
        this.state.imageList.page,
        true
      )
  }
  componentDidUpdate = () => {
    for (
      let row = 0;
      row < IMAGES_PER_PAGE / IMAGES_PER_ROW * this.state.imageList.page;
      row++
    ) {
      rows[row] = row
    }
  }

  // images list pagination
  incrementPage = () => {
    if (
      this.props.composer.imageList.page &&
      this.props.composer.imageList.page.total >= this.state.imageList.page
    ) {
      this.setState({
        imageList: {
          ...this.state.imageList,
          page: this.state.imageList.page + 1
        }
      })
      return true
    } else return false
  }

  // images list pagination
  incrementPage = () => {
    if (
      this.props.composer.imageList.page &&
      this.props.composer.imageList.page.total >= this.state.imageList.page
    ) {
      this.setState({
        imageList: {
          ...this.state.imageList,
          page: this.state.imageList.page + 1
        }
      })
      return true
    } else return false
  }

  // change image list display
  handleImagesSwitchView = view => {
    switch (view) {
      case "all":
        this.setState({
          imageList: {
            ...this.state.imageList,
            options: {
              ...this.state.imageList.options,
              featured: false,
              fullConsent: false
            }
          }
        })
        break
      case "open":
        this.setState({
          imageList: {
            ...this.state.imageList,
            options: {
              ...this.state.imageList.options,
              featured: false,
              fullConsent: true
            }
          }
        })
        break
      case "feature":
        this.setState({
          imageList: {
            ...this.state.imageList,
            options: {
              ...this.state.imageList.options,
              featured: true,
              fullConsent: true
            }
          }
        })
        break
      default:
    }
    window.requestAnimationFrame(() => {
      this.props.fetchImageList(this.state.imageList.options)
    })
  }

  // render
  render = () => {
    return this.props.user.status === "ok" &&
      this.props.user.info.role === "admin" ? (
      <Article>
        <Heading pageTitle="Admin" />

        <Section style={{ padding: "1.5em 0" }}>
          <div style={{ padding: "0 1.5em" }}>
            <h3>Images.</h3>
            <ButtonStrip style={{ margin: ".5em auto" }}>
              <div>
                <Item
                  left
                  inverse={
                    !this.state.imageList.options.featured &&
                    !this.state.imageList.options.fullConsent
                  }
                  onClick={view => this.handleImagesSwitchView("all")}
                >
                  All
                </Item>
                <Item
                  inverse={
                    !this.state.imageList.options.featured &&
                    this.state.imageList.options.fullConsent
                  }
                  onClick={view => this.handleImagesSwitchView("open")}
                >
                  Open
                </Item>
                <Item
                  right
                  inverse={
                    this.state.imageList.options.featured &&
                    this.state.imageList.options.fullConsent
                  }
                  onClick={view => this.handleImagesSwitchView("feature")}
                >
                  Featured
                </Item>
              </div>
            </ButtonStrip>
          </div>
          <GridContainer>
            {rows.map(row => (
              <GridRow key={row}>
                {this.props.composer.imageList.items
                  .slice(
                    row * IMAGES_PER_ROW,
                    row * IMAGES_PER_ROW + IMAGES_PER_ROW
                  )
                  .map(item => (
                    <GridButtonImage
                      label={item.featured && "Featured"}
                      span={4}
                      noShim
                      key={item.id}
                      src={item.id}
                      status={this.props.composer.imageList.status}
                      author={
                        this.props.composer.imageList.items[1]
                          ? item.author
                          : null
                      }
                      add={src => alert(src)}
                    />
                  ))}
              </GridRow>
            ))}
          </GridContainer>

          {this.props.composer.imageList.page &&
            this.props.composer.imageList.page.total >=
              this.state.imageList.page && (
              <Button onClick={this.handleImagesLoadMore}>
                Load More ({this.props.composer.imageList.page["items-total"]})
              </Button>
            )}

          <div style={{ padding: "0 1.5em" }}>
            <h3>Available for collaborations:</h3>
          </div>
        </Section>
      </Article>
    ) : (
      <Forbidden />
    )
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    fetchImageList: (options, page, appendItems) => {
      dispatch(fetchImageList(options, page, appendItems))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    composer: state.composer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
