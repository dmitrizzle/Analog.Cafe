import React from "react"

import ArticleSection from "../../../../core/components/pages/Article/components/ArticleSection"
import ArticleWrapper from "../../../../core/components/pages/Article/components/ArticleWrapper"
import Button from "../../../../core/components/controls/Button/components/Button"
import CardHeader from "../../../../core/components/controls/Card/components/CardHeader"
import CardIntegrated from "../../../../core/components/controls/Card/components/CardIntegrated"
import HeaderLarge from "../../../../core/components/vignettes/HeaderLarge"

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSharing: {
        googleAnalytics:
          localStorage.getItem("ga-enabled") === "false" ? false : true
      }
    }
  }
  handleToggleGA = () => {
    const googleAnalytics = !this.state.dataSharing.googleAnalytics
    this.setState({
      dataSharing: {
        ...this.state.dataSharing,
        googleAnalytics
      }
    })
    localStorage.setItem("ga-enabled", googleAnalytics)
  }
  render = () => {
    return (
      <ArticleWrapper>
        <HeaderLarge pageTitle="Privacy Settings" />
        <ArticleSection>
          <p>
            Google Analytics is used by Analog.Cafe to anonymously (individual
            users can not be identified) study how the visitors are using the
            website and how the website experience could be improved based on
            those findings.
          </p>
          <p>
            Analog.Cafe will store your preferences in your browser’s{" "}
            <em>LocalStorage</em> (not a cookie) and remember them indefinitely,
            as long as your browser or you, personally, do not choose to remove
            that data.
          </p>
          <CardIntegrated>
            <CardHeader
              stubborn
              buttons={[0]}
              noStar
              title="Share Usage Data With:"
            />
            <Button
              onClick={this.handleToggleGA}
              inverse={this.state.dataSharing.googleAnalytics}
            >
              Google Analytics
            </Button>
          </CardIntegrated>
          <p style={{ textAlign: "center" }}>
            <small>
              Your usage data is
              {!this.state.dataSharing.googleAnalytics && (
                <strong> not</strong>
              )}{" "}
              being
              {this.state.dataSharing.googleAnalytics && (
                <span> anonymously</span>
              )}{" "}
              shared with Google Analytics.
            </small>
          </p>
        </ArticleSection>
      </ArticleWrapper>
    )
  }
}
