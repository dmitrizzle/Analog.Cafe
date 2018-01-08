// tools
import React from "react"
import { imageSizeLimit } from "../../../../utils/upload-utils"

// redux
import { connect } from "react-redux"
import {
  getInfo as getUserInfo,
  setInfo as setUserInfo,
  acceptInfo as acceptUserInfo
} from "../../../../actions/userActions"
import { setCard } from "../../../../actions/modalActions"

// components
import Forbidden from "../../_screens-errors/Forbidden"
import { CardEditableProfile } from "../../../components/Card"

import Heading from "../../../components/ArticleHeading"
import { Button } from "../../../components/Button"
import { Article } from "../../../components/ArticleStyles"

// template for user profile button arrangement
import { profileButtonsTemplate } from "../../../../utils/profile-button-labeler"

import {
  ROUTE_AUTH_USER_LANDING,
  ROUTE_UPDATE_PROFILE_API
} from "../../../../constants/user"
import {
  SUMMARY_LENGTH_MAX,
  TITLE_LENGTH_MAX
} from "../../../../constants/input"
import errorMessages from "../../../../constants/messages/errors"

// render
class EditProfile extends React.PureComponent {
  // init
  constructor(props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleButtonChange = this.handleButtonChange.bind(this)
    this.handleButtonFocus = this.handleButtonFocus.bind(this)
    this.handleButtonBlur = this.handleButtonBlur.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.state = {
      setUserInfoPending: false
    }
  }

  componentDidMount = () => {
    // fetch user info if not present (for componentWillReceiveProps)
    if (
      this.props.user.status === "ok" &&
      typeof this.props.user.info === "object" &&
      Object.keys(this.props.user.info).length === 0
    ) {
      this.props.getUserInfo()
    } else
      // or populate all profile fields with current info
      this.populateEditableProfile()
  }
  componentWillReceiveProps = () => {
    this.props.user.status !== "updated"
      ? this.populateEditableProfile()
      : this.profileUpdated()
  }
  populateEditableProfile = () => {
    this.setState({
      title: this.props.user.info.title,
      text: this.props.user.info.text,
      image: this.props.user.info.image
        ? this.props.user.info.image
        : "image-froth_1000000_ry31Fw1l4",
      buttons: profileButtonsTemplate(
        this.props.user.info.id,
        this.props.user.info.buttons && this.props.user.info.buttons[1]
          ? this.props.user.info.buttons[1].to
          : undefined
      ),
      buttonText:
        this.props.user.info.buttons && this.props.user.info.buttons[1]
          ? this.props.user.info.buttons[1].text
          : ""
    })
  }

  // process changes to title and bio
  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
      warningTitle: event.target.value.length >= TITLE_LENGTH_MAX
    })
  }
  handleTextChange = event => {
    this.setState({
      text: event.target.value,
      warningText: event.target.value.length >= SUMMARY_LENGTH_MAX
    })
  }

  // process image uploads
  handleImageChange = () => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    imageSizeLimit(file.size, 5)
      .then(() => this.uploadRequest(file))
      .catch(reason => {
        this.props.setCard(
          {
            status: "ok",
            info: errorMessages.VIEW_TEMPLATE.UPLOAD_IMAGE_SIZE_5
          },
          { url: "errors/upload" }
        )
      })
  } // ⤵
  uploadRequest = file => {
    const reader = new FileReader()
    reader.addEventListener("load", () =>
      this.setState({ image: reader.result })
    )
    reader.readAsDataURL(file)
  }

  // process changes to user's link button
  handleButtonChange = event => {
    this.setState({
      buttons: profileButtonsTemplate(
        this.props.user.info.id,
        event.target.value
      ),
      buttonText: event.target.value
    })
  }
  handleButtonFocus = () => {
    this.setState({
      buttonText: this.state.buttons[1].to
    })
  }
  handleButtonBlur = () => {
    this.setState({
      buttonText: this.state.buttons[1].text
    })
  }

  handleDone = () => {
    const data = new FormData()
    data.append("title", this.state.title || this.props.user.info.id)
    data.append("text", this.state.text || "")
    data.append("buttons", JSON.stringify(this.state.buttons))
    this.fileInput.value && data.append("image", this.fileInput.files[0])

    const request = {
      method: "put",
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "JWT " + localStorage.getItem("token")
      },
      data,
      url: ROUTE_UPDATE_PROFILE_API
    }
    this.props.setUserInfo(request)
    this.setState({
      setUserInfoPending: true
    })
  }
  profileUpdated = () => {
    this.props.acceptUserInfo()
    this.props.history.push(ROUTE_AUTH_USER_LANDING)
    //this.props.history.goBack()
  }

  render = () => {
    return this.props.user.status === "ok" ? (
      <Article>
        <Heading pageTitle="Edit Your Profile" />
        <CardEditableProfile
          // these props are pulled from Redux store that has
          // logged-in user info

          // author's name
          title={this.state.title || ""}
          changeTitle={this.handleTitleChange}
          warningTitle={this.state.warningTitle}
          // author's bio
          text={this.state.text}
          changeText={this.handleTextChange}
          warningText={this.state.warningText}
          // author's avatar image
          image={this.state.image}
          changeImage={this.handleImageChange}
          // author's link
          buttonText={this.state.buttonText}
          changeButton={this.handleButtonChange}
          focusButton={this.handleButtonFocus}
          blurButton={this.handleButtonBlur}
        />

        {/* Image upload hidden input */}
        <input
          type="file"
          accept="image/x-png,image/jpeg"
          style={{ display: "none" }}
          ref={input => {
            this.fileInput = input
          }}
          onChange={this.handleFileUpload}
        />

        <Button
          onClick={this.handleDone}
          red
          loading={this.state.setUserInfoPending ? true : false}
        >
          Done
        </Button>
      </Article>
    ) : (
      <Forbidden />
    )
  }
}
//to={ROUTE_AUTH_USER_LANDING}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => {
      dispatch(getUserInfo())
    },
    setUserInfo: user => {
      dispatch(setUserInfo(user))
    },
    acceptUserInfo: () => {
      dispatch(acceptUserInfo())
    },
    setCard: (info, request) => {
      dispatch(setCard(info, request))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
