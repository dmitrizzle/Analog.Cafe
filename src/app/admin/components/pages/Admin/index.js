import { connect } from "react-redux"
import React from "react"

import {
  Article,
  Section
} from "../../../../core/components/styles/ArticleStyles"
import {
  deleteImageRecord,
  featureImage,
  unfeatureImage
} from "../../../store/actions-image"
import { fetchImageLib } from "../../../../user/store/actions-imagelib"
import { fetchUserList } from "../../../store/actions-admin"
import { setCard } from "../../../../core/store/actions-modal"
import Forbidden from "../../../../core/components/pages/Forbidden"
import Heading from "../../../../core/components/vignettes/ArticleHeading"
import ImageAdmin from "./components/ImageAdmin"
import UserAdmin from "./components/UserAdmin"

const GRID_ROWS = 4
const GRID_CELLS = 16
let rowIndex = []

class Admin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imageList: {
        page: 2,
        options: {
          featured: false,
          fullConsent: false,
          itemsPerPage: GRID_CELLS
        }
      }
    }
  }
  componentDidMount = () => {
    this.props.fetchImageLib(this.state.imageList.options)
    this.props.fetchUserList({
      itemsPerPage: 100
    })
  }
  componentDidUpdate = () => {
    for (
      let rowNumber = 0;
      rowNumber < GRID_CELLS / GRID_ROWS * this.state.imageList.page;
      rowNumber++
    ) {
      rowIndex[rowNumber] = rowNumber
    }
  }
  handleImagesLoadMore = () => {
    this.incrementImagesPage() &&
      this.props.fetchImageLib(
        this.state.imageList.options,
        this.state.imageList.page,
        true
      )
  }
  incrementImagesPage = () => {
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
  handleImageDelete = (id, event) => {
    event.preventDefault()
    const confirmDelete = prompt(
      `WARNING!\n\nThis will remove the document with this image's data from ` +
        `the database. This can not be undone. The image file itself will need ` +
        `to be deleted from Cloudinary separately. Type\n\n${id}\n\nto confirm.`
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
          <ImageAdmin
            imagesSwitchView={this.handleImagesSwitchView}
            imageDelete={this.handleImageDelete}
            imageFeature={this.handleImageFeature}
            imageUnfeature={this.handleImageUnfeature}
            imagesLoadMore={this.handleImagesLoadMore}
            stateImageList={this.state.imageList}
            setCard={this.props.setCard}
            rowIndex={rowIndex}
            gridRows={GRID_ROWS}
            imagelib={this.props.imagelib}
          />
          <UserAdmin
            rowIndex={rowIndex}
            gridRows={GRID_ROWS}
            admin={this.props.admin}
            setCard={this.props.setCard}
          />
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
