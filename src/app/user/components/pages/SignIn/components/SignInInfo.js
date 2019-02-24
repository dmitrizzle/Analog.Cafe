import React from "react"

export default props => {
  return (
    <p style={{ textAlign: "center", marginBottom: "0" }}>
      Get <strong>free access</strong> to film photography resources and
      exclusive content.
      <br />
      <small>
        {props.stateSessionInfo.hasLoggedIn &&
        props.stateSessionInfo.loginMethod ? (
          <em>
            Hint: last time you used {props.stateSessionInfo.loginEmail}{" "}
            {props.stateSessionInfo.loginMethod}.
          </em>
        ) : (
          <span>&nbsp;</span>
        )}
      </small>
    </p>
  )
}
