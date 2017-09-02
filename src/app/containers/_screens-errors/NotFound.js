// tools
import React from "react"
import { withRouter } from "react-router"
import Link from "../../components/Link"

// redux & state
import { connect } from "react-redux"
import { initPage as resetArticle } from "../../../actions/articleActions"
import { initPage as resetList } from "../../../actions/listActions"

// components
import Heading from "../../components/ArticleHeading"
import { Section, Article } from "../../components/ArticleStyles"

// render
class NotFound extends React.PureComponent {
  // set signal to the app that this is a 404 situation
  componentWillMount() {
    this.props.history.replace({
      state: {
        status: "404"
      }
    })
  }

  // clear all signals and error states associated with 404 NotFound
  cleanState = () => {
    // reset browser history state
    this.props.history.replace({
      state: {
        status: "200"
      }
    })
    // reset redux state for article 404 status
    this.props.resetArticle()
    // redux state for list 404 status
    this.props.resetList()
  }
  componentWillUnmount() {
    this.cleanState()
  }

  render() {
    return (
      <Article>
        <Heading pageTitle="😨" pageSubtitle="Page Not Found&hellip;" />
        <Section>
          <p style={{ textAlign: "center" }}>
            Click{" "}
            <strong>
              <Link to="/" onClick={this.cleanState}>
                here
              </Link>
            </strong>{" "}
            to go to homepage.
          </p>
        </Section>
      </Article>
    )
  }
}

// conect with redux
const mapStateToProps = state => {
  return {
    article: state.article,
    list: state.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    resetArticle: state => {
      dispatch(resetArticle(state))
    },
    resetList: state => {
      dispatch(resetList(state))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NotFound)
)
