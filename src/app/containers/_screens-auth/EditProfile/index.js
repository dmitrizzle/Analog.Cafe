// tools
import React from "react"

// redux
import { connect } from "react-redux"

// components
import Forbidden from "../../_screens-errors/Forbidden"
import { CardEditableProfile } from "../../../components/Card"

import Heading from "../../../components/ArticleHeading"
import { LinkButton } from "../../../components/Button"
import { Article } from "../../../components/ArticleStyles"

// template for user profile button arrangement
import { profileButtonsTemplate } from "./helpers"

import { ROUTE_AUTH_USER_LANDING } from "../../../../constants/user"

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
      title: this.props.user.info.title,
      text: this.props.user.info.text,
      image: this.props.user.info.image,
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
    }
  }

  // process changes to title and bio
  handleTitleChange = event => {
    this.setState({
      ...this.state,
      title: event.target.value
    })
  }
  handleTextChange = event => {
    this.setState({
      ...this.state,
      text: event.target.value
    })
  }

  // process image uploads
  handleImageChange = () => {
    this.fileInput.click()
  }
  handleFileUpload = event => {
    const file = event.target.files[0]
    this.uploadRequest(file)
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
      ...this.state,
      buttons: profileButtonsTemplate(
        this.props.user.info.id,
        event.target.value
      ),
      buttonText: event.target.value
    })
  }
  handleButtonFocus = () => {
    this.setState({
      ...this.state,
      buttonText: this.state.buttons[1].to
    })
  }
  handleButtonBlur = () => {
    this.setState({
      ...this.state,
      buttonText: this.state.buttons[1].text
    })
  }

  render = () => {
    return this.props.user.info.status === "ok" ? (
      <Article>
        <Heading pageTitle="Edit Your Profile" />
        <CardEditableProfile
          // these props are pulled from Redux store that has
          // logged-in user info

          // author's name
          title={this.props.title}
          changeTitle={this.handleTitleChange}
          // author's bio
          text={this.props.text}
          changeText={this.handleTextChange}
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

        <LinkButton to={ROUTE_AUTH_USER_LANDING} red>
          Done
        </LinkButton>
      </Article>
    ) : (
      <Forbidden />
    )
  }
}

// connet with redux
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(EditProfile)
