// tools
import React from "react"

// redux
import { connect } from "react-redux"
import { fetchCollabFeatures } from "../../../../actions/composerActions"

// components
import Forbidden from "../../_screens-errors/Forbidden"

import Heading from "../../../components/ArticleHeading"
//import { Button } from "../../../components/_controls/Button"
import { Article, Section } from "../../../components/ArticleStyles"

import {
  GridButtonImage,
  GridContainer,
  GridRow
} from "../../../components/Grid"

const IMAGES_PER_ROW = 4
const ROWS = 25
let rows = []
for (let row = 0; row < ROWS; row++) {
  rows[row] = row
}

// render
class Admin extends React.PureComponent {
  componentDidMount = () => {
    // get featured collab images
    this.props.fetchCollabFeatures({ featured: false })
  }
  render = () => {
    return this.props.user.status === "ok" &&
      this.props.user.info.role === "admin" ? (
      <Article>
        <Heading pageTitle="Admin" />

        <Section style={{ padding: "1.5em 0" }}>
          <div style={{ padding: "0 1.5em" }}>
            <h3>Collab pool:</h3>
          </div>
          <GridContainer>
            {rows.map(row => (
              <GridRow>
                {this.props.composer.collabFeatures.items
                  .slice(
                    row * IMAGES_PER_ROW,
                    row * IMAGES_PER_ROW + IMAGES_PER_ROW
                  )
                  .map(item => (
                    <GridButtonImage
                      highlight={item.featured}
                      noShim
                      key={item.id}
                      src={item.id}
                      status={this.props.composer.collabFeatures.status}
                      author={
                        this.props.composer.collabFeatures.items[1]
                          ? item.author
                          : null
                      }
                      add={src => alert(src)}
                    />
                  ))}
              </GridRow>
            ))}
          </GridContainer>

          <div style={{ padding: "0 1.5em" }}>
            <h3>Available for collaborations:</h3>
          </div>
        </Section>
      </Article>
    ) : (
      <Forbidden />
    )
  }
}

// connect with redux
const mapDispatchToProps = dispatch => {
  return {
    fetchCollabFeatures: featured => {
      dispatch(fetchCollabFeatures(featured))
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    composer: state.composer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)
