import React from "react"

import Card from "../../Card"

export const windowHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      topOffset: 0
    }
  }
  componentWillReceiveProps = () => {
    const element = document.getElementById("modal-card")
    if (element)
      window.requestAnimationFrame(() => {
        const topOffset = (windowHeight() - element.offsetHeight) / 2
        this.setState({
          topOffset: topOffset > 20 ? topOffset : 20
        })
      })
  }
  render = () => {
    return (
      <Card
        {...this.props}
        style={{
          margin: `${this.state.topOffset}px auto 90.1vh`
        }}
        id="modal-card"
      />
    )
  }
}
