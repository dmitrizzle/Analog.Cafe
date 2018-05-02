import { connect } from "react-redux"
import React from "react"

import { CARD_ERRORS } from "../../../constants/messages-submission"
import {
  INPUT_SUMMARY_LIMIT,
  INPUT_TITLE_LIMIT
} from "../../../constants/rules-submission"
import {
  ROUTE_API_USER_PROFILE,
  ROUTE_URL_USER_LANDING
} from "../../../constants/routes-session"
import {
  acceptUserInfo,
  getUserInfo,
  setUserInfo
} from "../../../store/actions-user"
import { forceImageRestrictions } from "../../../utils/actions-submission"
import { getProfileButtons } from "../../../utils/messages-profile"
import { setModal } from "../../../../core/store/actions-modal"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Button from "../../../../core/components/controls/Button/components/Button"
import Forbidden from "../../../../core/components/pages/Error/components/Forbidden"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"
import ProfileCard from "./components/ProfileCard"

class EditProfile extends React.PureComponent {
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
    if (
      this.props.user.status === "ok" &&
      typeof this.props.user.info === "object" &&
      Object.keys(this.props.user.info).length === 0
    ) {
      this.props.getUserInfo()
    } else this.populateEditableProfile()
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
      buttons: getProfileButtons(
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
  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
      warningTitle: event.target.value.length >= INPUT_TITLE_LIMIT
    })
  }
  handleTextChange = event => {
    this.setState({
      text: event.target.value,
      warningText: event.target.value.length >= INPUT_SUMMARY_LIMIT
    })
  }
  handleImageChange = () => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    forceImageRestrictions(file.size, file.type, 5)
      .then(() => this.uploadRequest(file))
      .catch(() => {
        this.props.setModal(
          {
            status: "ok",
            info: CARD_ERRORS.IMAGE_SIZE(5)
          },
          { url: "errors/upload" }
        )
      })
  }
  uploadRequest = file => {
    const reader = new FileReader()
    reader.addEventListener("load", () =>
      this.setState({ image: reader.result })
    )
    reader.readAsDataURL(file)
  }
  handleButtonChange = event => {
    this.setState({
      buttons: getProfileButtons(this.props.user.info.id, event.target.value),
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
    data.append(
      "title",
      this.state.title || this.props.user.info.id.split("-", 1)[0]
    )
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
      url: ROUTE_API_USER_PROFILE
    }
    this.props.setUserInfo(request)
    this.setState({
      setUserInfoPending: true
    })
  }
  profileUpdated = () => {
    this.props.acceptUserInfo()
    this.props.history.push(ROUTE_URL_USER_LANDING)
  }
  render = () => {
    return this.props.user.status === "ok" ? (
      <ArticleWrapper>
        <HeaderLarge pageTitle="Edit Your Profile" />
        <ProfileCard
          title={this.state.title || ""}
          changeTitle={this.handleTitleChange}
          warningTitle={this.state.warningTitle}
          text={this.state.text}
          changeText={this.handleTextChange}
          warningText={this.state.warningText}
          image={this.state.image}
          changeImage={this.handleImageChange}
          buttonText={this.state.buttonText}
          changeButton={this.handleButtonChange}
          focusButton={this.handleButtonFocus}
          blurButton={this.handleButtonBlur}
        />
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
          branded
          loading={this.state.setUserInfoPending ? true : false}
        >
          Done
        </Button>
      </ArticleWrapper>
    ) : (
      <Forbidden />
    )
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
