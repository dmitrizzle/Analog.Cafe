// tools
import React from "react"

// components
import HeaderEditor from "./containers/HeaderEditor"
import ContentEditor from "./containers/ContentEditor"
import { Section } from "../../components/ArticleStyles"

// placeholders
const titlePlaceholder = {
  title: "Title",
  subtitle: "Subtitle (Optional)"
}

// return
export default props => {
  return (
    <div>
      <HeaderEditor
        composerState={props.composerState}
        pageTitle={titlePlaceholder.title}
        pageSubtitle={titlePlaceholder.subtitle}
      />
      <Section onClick={() => alert("Focus on Editor")}>
        <ContentEditor
          composerState={props.composerState}
          ref={input => {
            this.contentEditor = input
          }}
        />
      </Section>
    </div>
  )
}

// NOTE: this is a pure component but it's in the containers folder to help tie
// everything together.
