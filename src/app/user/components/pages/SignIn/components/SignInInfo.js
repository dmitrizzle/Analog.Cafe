import React from "react"

export default props => {
  return (
    <p style={{ textAlign: "center", marginBottom: "0" }}>
      Sign in to send your submission, edit profile, and get notifications. New?
      We’ll create an account for you automatically!
      <br />
      <small>
        {props.stateSessionInfo.login && props.stateSessionInfo.method ? (
          <em>
            Hint: last time you used {props.stateSessionInfo.id}{" "}
            {props.stateSessionInfo.method}.
          </em>
        ) : (
          <span>&nbsp;</span>
        )}
      </small>
    </p>
  )
}
