import { connect } from "react-redux"
import React from "react"

import {
  Article,
  Section
} from "../../../../core/components/styles/ArticleStyles"
import { Button } from "../../../../core/components/controls/Button"
import {
  ButtonStrip,
  Item
} from "../../../../core/components/controls/ButtonStrip"
import {
  GridButtonImage,
  GridContainer,
  GridRow
} from "../../../../user/components/controls/Grid"
import {
  deleteRecord as deleteImageRecord,
  feature as featureImage,
  unfeature as unfeatureImage
} from "../../../../core/store/actions-picture"
import { fetchImageLib } from "../../../../user/store/actions-imagelib"
import { fetchUserList } from "../../../store/actions-admin"
import { setCard } from "../../../../core/store/actions-modal"
import Forbidden from "../../../../core/components/pages/Forbidden"
import Heading from "../../../../core/components/vignettes/ArticleHeading"

const IMAGES_PER_ROW = 4
const IMAGES_PER_PAGE = 16
let rows = []

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
    this.props.fetchImageLib(this.state.imageList.options)

    this.props.fetchUserList({
      itemsPerPage: 100
    })
  }
  handleImagesLoadMore = () => {
    this.incrementPage() &&
      this.props.fetchImageLib(
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

  handleImageDelete = (id, event) => {
    event.preventDefault()
    const confirmDelete = prompt(
      `WARNING!\n\nThis will remove the document with this image's data from the database. This can not be undone. The image file itself will need to be deleted from Cloudinary separately. Type\n\n${id}\n\nto confirm.`
    )
    if (confirmDelete === id) {
      this.props.deleteImageRecord(id)
    }
  }
  handleImageFeature = (id, event) => {
    event.preventDefault()
    this.props.featureImage(id)
  }
  handleImageUnfeature = (id, event) => {
    event.preventDefault()
    this.props.unfeatureImage(id)
  }

  // images list pagination
  incrementPage = () => {
    if (
      this.props.imagelib.page &&
      this.props.imagelib.page.total >= this.state.imageList.page
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
      this.props.imagelib.page &&
      this.props.imagelib.page.total >= this.state.imageList.page
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
      this.props.imagelib.page &&
      this.props.imagelib.page.total >= this.state.imageList.page
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
      this.props.fetchImageLib(this.state.imageList.options)
    })
  }

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
                {this.props.imagelib.items
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
                      status={this.props.imagelib.status}
                      author={this.props.imagelib.items[1] ? item.author : null}
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
                                to: "#image-delete",
                                onClick: event =>
                                  this.handleImageDelete(src, event),
                                text: "Delete from Database"
                              },
                              this.state.imageList.options.fullConsent &&
                              !item.featured
                                ? {
                                    to: "#image-feature",
                                    onClick: event =>
                                      this.handleImageFeature(src, event),
                                    text: "Add to Featured List"
                                  }
                                : null,
                              this.state.imageList.options.fullConsent &&
                              item.featured
                                ? {
                                    to: "#image-unfeature",
                                    onClick: event =>
                                      this.handleImageUnfeature(src, event),
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

          {this.props.imagelib.page &&
            this.props.imagelib.page.total >= this.state.imageList.page && (
              <Button onClick={this.handleImagesLoadMore}>
                Load More ({this.props.imagelib.page["items-total"]})
              </Button>
            )}

          <div style={{ padding: "0 1.5em" }}>
            <h3>Users.</h3>
          </div>
          <GridContainer>
            {rows.map(row => (
              <GridRow key={row}>
                {this.props.admin.accountList.items
                  .slice(
                    row * IMAGES_PER_ROW,
                    row * IMAGES_PER_ROW + IMAGES_PER_ROW
                  )
                  .map(item => (
                    <GridButtonImage
                      label={item.role}
                      span={4}
                      noShim
                      key={item.id}
                      src={item.image}
                      status={this.props.admin.accountList.status}
                      author={{
                        name: item.title,
                        id: item.id,
                        email: item.email
                      }}
                      add={(src, author) =>
                        this.props.setCard({
                          info: {
                            title: author.title || author.id,
                            text: `${author.email}`,
                            buttons: [
                              {
                                to: `mailto:${author.email}`,
                                text: "Contact via Email"
                              },
                              {
                                to: "#user-suspend",
                                onClick: () => alert("suspend"),
                                text: "Suspend user"
                              }
                            ]
                          }
                        })
                      }
                    />
                  ))}
              </GridRow>
            ))}
          </GridContainer>
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
    fetchImageLib: (options, page, appendItems) => {
      dispatch(fetchImageLib(options, page, appendItems))
    },
    fetchUserList: (options, page, appendItems) => {
      dispatch(fetchUserList(options, page, appendItems))
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
    admin: state.admin,
    user: state.user,
    imagelib: state.imagelib
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
