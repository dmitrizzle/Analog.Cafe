// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { fetchImageList } from "../../../../actions/composerActions"
import { setCard } from "../../../../actions/modalActions"
import {
  deleteRecord as deleteImageRecord,
  feature as featureImage,
  unfeature as unfeatureImage
} from "../../../../actions/pictureActions"

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

  componentWillReceiveProps = newProps => {
    const hash = window.location.hash
    const id = hash
      .replace("#delete:", "")
      .replace("#feature:", "")
      .replace("#unfeature:", "")

    // delete image records
    if (hash.includes("#delete")) {
      this.props.history.replace("/me/admin")
      const confirmDelete = prompt(
        `WARNING!\n\nThis will remove the document with this image's data from the database. This can not be undone. The image file itself will need to be deleted from Cloudinary separately. Type\n\n${id}\n\nto confirm.`
      )
      if (confirmDelete === id) {
        this.props.deleteImageRecord(id)
      }
    }
    if (hash.includes("#feature")) {
      this.props.history.replace("/me/admin")
      this.props.featureImage(id)
    }
    if (hash.includes("#unfeature")) {
      this.props.history.replace("/me/admin")
      this.props.unfeatureImage(id)
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
                      add={src =>
                        this.props.setCard({
                          info: {
                            title: src,
                            image: src,
                            buttons: [
                              {
                                to: `https://cloudinary.com/console/media_library/asset/image/upload/${src}`,
                                text: "View on Cloudinary"
                              },
                              {
                                to: `#delete:${src}`,
                                text: "Delete from Database"
                              },
                              this.state.imageList.options.fullConsent &&
                              !item.featured
                                ? {
                                    to: `#feature:${src}`,
                                    text: "Add to Featured List"
                                  }
                                : null,
                              this.state.imageList.options.fullConsent &&
                              item.featured
                                ? {
                                    to: `#unfeature:${src}`,
                                    text: "Remove from Featured List"
                                  }
                                : null
                            ]
                          }
                        })
                      }
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
    },
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    },
    deleteImageRecord: id => {
      dispatch(deleteImageRecord(id))
    },
    featureImage: id => {
      dispatch(featureImage(id))
    },
    unfeatureImage: id => {
      dispatch(unfeatureImage(id))
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
