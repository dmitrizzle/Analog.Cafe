import React from "react"
import axios from "axios"

import { makeAPIRequest } from "../../../../utils"

const MESSAGE_SERVER =
  "https://my-json-server.typicode.com/dmitrizzle/Analog.Cafe.message"
export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      message: "…"
    }
  }
  componentDidMount = () => {
    axios(
      makeAPIRequest({
        url: `${MESSAGE_SERVER}/${this.props.from}`
      })
    ).then(response => {
      this.setState({
        message: response.data[this.props.id]
      })
    })
  }

  render = () => {
    return <span>{this.state.message}</span>
  }
}
