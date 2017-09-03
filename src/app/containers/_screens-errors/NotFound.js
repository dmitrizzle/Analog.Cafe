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
  // clear all 404 statuses from article and list stores & router state
  resetStores = () => {
    // reset browser history state
    this.props.history.replace({
      state: {
        status: "200"
      }
    })

    // empty delay necessary to wait for all dom render to complete
    // (componentDidMount is still too early and render conficts with redux)
    setTimeout(() => {
      // reset redux store for article 404 status
      this.props.resetArticle()
      // redux store for list 404 status
      this.props.resetList()

      console.log("reset")
    }, 0)
  }

  // set signal to the app that this is a 404 situation
  componentWillMount() {
    this.props.history.replace({
      state: {
        status: "404"
      }
    })
    this.unlisten = this.props.history.listen(location => this.resetStores())
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return this.props.history.location.state &&
    this.props.history.location.state.status === "404"
      ? <Article>
          <Heading pageTitle="😨" pageSubtitle="Page Not Found&hellip;" />
          <Section>
            <p style={{ textAlign: "center" }}>
              Click{" "}
              <strong>
                <Link to="/" onClick={this.unlisten}>
                  here
                </Link>
              </strong>{" "}
              to go to homepage.
            </p>
          </Section>
        </Article>
      : <Article>
          <Section>
            <Heading pageSubtitle="One moment, please&hellip;" />
          </Section>
        </Article>
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
