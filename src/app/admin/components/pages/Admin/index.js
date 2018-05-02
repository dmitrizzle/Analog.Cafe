import { connect } from "react-redux"
import React from "react"

import {
  deleteImageRecord,
  featureImage,
  unfeatureImage
} from "../../../store/actions-image"
import { fetchImageLib } from "../../../../user/store/actions-imagelib"
import { fetchUserList } from "../../../store/actions-admin"
import { setModal } from "../../../../core/store/actions-modal"
import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Forbidden from "../../../../core/components/pages/Error/components/Forbidden"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import ImageAdmin from "./components/ImageAdmin"
import UserAdmin from "./components/UserAdmin"

const ITEMS_PER_PAGE = 16
const ITEMS_PER_ROW = 4
const ROW_INDEX = (page, rows, cells) => {
  let rowIndex = []
  for (
    let rowNumber = 0;
    rowNumber <
    (cells || ITEMS_PER_PAGE) / (rows || ITEMS_PER_ROW) * (page || 1);
    rowNumber++
  ) {
    rowIndex[rowNumber] = rowNumber
  }
  return rowIndex
}
const TEXT_CONFIRM_DELETE = id => {
  return (
    `WARNING!\n\nThis will remove the document with this image's data from ` +
    `the database. This can not be undone. The image file itself will need ` +
    `to be deleted from Cloudinary separately. Type\n\n${id}\n\nto confirm.`
  )
}

class Admin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imageList: {
        page: 2,
        options: {
          featured: false,
          fullConsent: false,
          itemsPerPage: ITEMS_PER_PAGE
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
    const confirmDelete = prompt(TEXT_CONFIRM_DELETE(id))
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
      <ArticleWrapper>
        <HeaderLarge pageTitle="Admin" />

        <ArticleSection style={{ padding: "1.5em 0" }}>
          <ImageAdmin
            imagesSwitchView={this.handleImagesSwitchView}
            imageDelete={this.handleImageDelete}
            imageFeature={this.handleImageFeature}
            imageUnfeature={this.handleImageUnfeature}
            imagesLoadMore={this.handleImagesLoadMore}
            stateImageList={this.state.imageList}
            setModal={this.props.setModal}
            rowIndex={ROW_INDEX(this.state.imageList.page)}
            gridRows={ITEMS_PER_ROW}
            imagelib={this.props.imagelib}
          />
          <UserAdmin
            rowIndex={ROW_INDEX(1, ITEMS_PER_ROW, 100)}
            gridRows={ITEMS_PER_ROW}
            admin={this.props.admin}
            setModal={this.props.setModal}
          />
        </ArticleSection>
      </ArticleWrapper>
    ) : (
      <Forbidden />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchImageLib: (options, page, appendItems) => {
      dispatch(fetchImageLib(options, page, appendItems))
    },
    fetchUserList: (options, page, appendItems) => {
      dispatch(fetchUserList(options, page, appendItems))
    },
    setModal: (info, request) => {
      dispatch(setModal(info, request))
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
