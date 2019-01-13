import React from "react"

export default props => {
  return (
    <p style={{ textAlign: "center", marginBottom: "0" }}>
      Sign in to send your submission or edit your profile.
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
