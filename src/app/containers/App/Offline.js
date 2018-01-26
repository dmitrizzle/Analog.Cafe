// tools
import React from "react"
import Loadable from "react-loadable"
import Link from "../../components/_controls/Link"

// redux
import { connect } from "react-redux"
import { addAvailableComponent } from "../../../actions/userActions"

class EnableOffline extends React.PureComponent {
  handleClick = event => {
    event.preventDefault()
    Loadable.preloadAll()
      .then(() => {
        this.props.addAvailableComponent("Composer")
        this.forceUpdate()
      })
      .catch(error => console.log(error))
  }
  render = () => {
    if (
      this.props.user.connection.status !== "offline" ||
      this.props.user.connection.availableComponents.indexOf("Composer") !== -1
    )
      return (
        <small style={{ opacity: "0.5" }}>
          {this.props.user.connection.availableComponents.indexOf(
            "Composer"
          ) === -1 ? (
            <span>
              <Link to="#download" onClick={this.handleClick}>
                Enable
              </Link>{" "}
              offline editing.
            </span>
          ) : (
            <span>You can now edit while offline.</span>
          )}
        </small>
      )
    else return null
  }
}

// connect with redux
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addAvailableComponent: componentName => {
      dispatch(addAvailableComponent(componentName))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EnableOffline)
