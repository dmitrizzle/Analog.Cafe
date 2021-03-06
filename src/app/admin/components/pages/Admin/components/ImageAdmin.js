import { ButtonStrip } from "@roast-cms/react-button-beans"
import React from "react"

import Button from "../../../../../core/components/controls/Button/components/Button"
import ButtonStripItem from "../../../../../core/components/controls/Button/components/ButtonStripItem"
import GridButtonImage from "../../../controls/Grid/components/GridButtonImage"
import GridRow from "../../../controls/Grid/components/GridRow"
import GridWrapper from "../../../controls/Grid/components/GridWrapper"

export default props => {
  return [
    <div style={{ padding: "0 1.5em" }} key="ImageAdmin_header">
      <h3>Images.</h3>
      <ButtonStrip style={{ margin: ".5em auto", whiteSpace: "nowrap" }}>
        <div>
          <ButtonStripItem
            left
            inverse={
              !props.stateImageList.options.featured &&
              !props.stateImageList.options.fullConsent
            }
            onClick={view => props.imagesSwitchView("all")}
          >
            All
          </ButtonStripItem>
          <ButtonStripItem
            inverse={
              !props.stateImageList.options.featured &&
              props.stateImageList.options.fullConsent
            }
            onClick={view => props.imagesSwitchView("open")}
          >
            Open
          </ButtonStripItem>
          <ButtonStripItem
            right
            inverse={
              props.stateImageList.options.featured &&
              props.stateImageList.options.fullConsent
            }
            onClick={view => props.imagesSwitchView("feature")}
          >
            Featured
          </ButtonStripItem>
        </div>
      </ButtonStrip>
    </div>,
    <GridWrapper key="ImageAdmin_grid">
      {props.rowIndex.map(rowNumber => (
        <GridRow key={rowNumber}>
          {props.imagelib.items
            .slice(
              rowNumber * props.gridRows,
              rowNumber * props.gridRows + props.gridRows
            )
            .map(item => (
              <GridButtonImage
                label={item.featured && "Featured"}
                span={4}
                noShim
                key={item.id}
                src={item.id}
                status={props.imagelib.status}
                author={props.imagelib.items[1] ? item.author : null}
                add={src =>
                  props.setModal({
                    info: {
                      title: src,
                      image: src,
                      buttons: [
                        {
                          to: `https://cloudinary.com/console/media_library/asset/image/upload/${src}`,
                          text: "View on Cloudinary"
                        },
                        {
                          to: "#image-delete",
                          onClick: event => props.imageDelete(src, event),
                          text: "Delete from Database"
                        },
                        props.stateImageList.options.fullConsent &&
                        !item.featured
                          ? {
                              to: "#image-feature",
                              onClick: event => props.imageFeature(src, event),
                              text: "Add to Featured List"
                            }
                          : null,
                        props.stateImageList.options.fullConsent &&
                        item.featured
                          ? {
                              to: "#image-unfeature",
                              onClick: event =>
                                props.imageUnfeature(src, event),
                              text: "Remove from Featured List"
                            }
                          : null
                      ]
                    }
                  })
                }
              />
            ))}
        </GridRow>
      ))}
    </GridWrapper>,
    <div key="ImageAdmin_loadmore">
      {props.imagelib.page &&
        props.imagelib.page.total >= props.stateImageList.page && (
          <Button onClick={props.imagesLoadMore}>
            Load More ({props.imagelib.page["items-total"]})
          </Button>
        )}
    </div>
  ]
}
