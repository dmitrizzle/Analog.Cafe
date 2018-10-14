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
      topOffset: 0,
      topOffsetMax: 20,
      minElementHeight: 80
    }
  }
  componentWillReceiveProps = () => {
    const element = document.getElementById("modal-card")
    if (element)
      window.requestAnimationFrame(() => {
        const elementHeight = element.offsetHeight
        const topOffset = (windowHeight() - elementHeight) / 2
        this.setState({
          topOffset:
            elementHeight >= this.state.minElementHeight
              ? topOffset > this.state.topOffsetMax
                ? topOffset
                : this.state.topOffsetMax
              : this.state.topOffsetMax
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
