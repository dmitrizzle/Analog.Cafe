import React from "react"

import GridButton from "../../Grid/components/GridButton"
import GridButtonImage from "../../Grid/components/GridButtonImage"
import GridRow from "../../Grid/components/GridRow"
import GridWrapper from "../../Grid/components/GridWrapper"

export default props => {
  return (
    <GridWrapper>
      <GridRow>
        {props.imagelib.items.slice(0, 2).map(item => {
          return (
            <GridButtonImage
              key={item.id}
              src={item.id}
              status={props.imagelib.status}
              author={props.imagelib.items[1] ? item.author : null}
              add={props.imagelib.items[1] ? props.imageSuggestion : null}
            />
          )
        })}
        <GridButton onClick={props.initFileUpload} branded>
          <div style={{ margin: "0 auto", paddingLeft: ".5em" }}>
            ＋
            <br />
            Upload<span> New</span>
          </div>
        </GridButton>
      </GridRow>
      <GridRow>
        {props.imagelib.items.slice(2, 5).map(item => {
          return (
            <GridButtonImage
              key={item.id}
              src={item.id}
              status={props.imagelib.status}
              author={item.author}
              add={props.imageSuggestion}
            />
          )
        })}
      </GridRow>
      <GridRow>
        {props.imagelib.items.slice(5, 8).map(item => {
          return (
            <GridButtonImage
              key={item.id}
              src={item.id}
              status={props.imagelib.status}
              author={item.author}
              add={props.imageSuggestion}
            />
          )
        })}
      </GridRow>
    </GridWrapper>
  )
}
