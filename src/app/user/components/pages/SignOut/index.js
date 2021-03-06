import { connect } from "react-redux"

import { forgetUser } from "../../../store/actions-user"

const SignOut = props => {
  props.forgetUser()
  props.history.replace({ pathname: "/" })
  return null
}
const mapDispatchToProps = dispatch => {
  return {
    forgetUser: () => {
      dispatch(forgetUser())
    }
  }
}
export default connect(null, mapDispatchToProps)(SignOut)
