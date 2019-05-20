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
      minElementHeight: 80,
      visible: false
    }
  }
  componentWillReceiveProps = () => {
    const element = document.getElementById("modal-card")
    this.setState({ visible: false })
    if (element) {
      window.requestAnimationFrame(() => {
        const elementHeight = element.offsetHeight
        const topOffset = (windowHeight() - elementHeight) / 2
        this.setState({
          topOffset:
            elementHeight >= this.state.minElementHeight
              ? topOffset > this.state.topOffsetMax
                ? topOffset
                : this.state.topOffsetMax
              : this.state.topOffsetMax,
          visible: true
        })
      })

      // const delayReveal = setTimeout(() => {
      //   this.setState({ visible: true })
      //   clearTimeout(delayReveal)
      // }, 150)
    }
  }
  render = () => {
    return (
      <Card
        {...this.props}
        style={{
          opacity: this.state.visible ? 1 : 0,
          transition: "margin 150ms",
          margin: `${this.state.topOffset}px auto 90.1vh`
        }}
        id="modal-card"
      />
    )
  }
}
