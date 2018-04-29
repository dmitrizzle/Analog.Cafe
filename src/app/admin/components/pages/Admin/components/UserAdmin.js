import React from "react"

import { GridButtonImage } from "../../../../../user/components/controls/Grid"
import {
  GridContainer,
  GridRow
} from "../../../../../user/components/controls/Grid/styles"

export default props => {
  return [
    <div style={{ padding: "0 1.5em" }} key="UserAdmin_header">
      <h3>Users.</h3>
    </div>,
    <GridContainer key="UserAdmin_grid">
      {props.rowIndex.map(rowNumber => (
        <GridRow key={rowNumber}>
          {props.admin.accountList.items
            .slice(
              rowNumber * props.gridRows,
              rowNumber * props.gridRows + props.gridRows
            )
            .map(item => (
              <GridButtonImage
                label={item.role}
                span={4}
                noShim
                key={item.id}
                src={item.image}
                status={props.admin.accountList.status}
                author={{
                  name: item.title,
                  id: item.id,
                  email: item.email
                }}
                add={(src, author) =>
                  props.setModal({
                    info: {
                      title: author.title || author.id,
                      text: `${author.email}`,
                      buttons: [
                        {
                          to: `mailto:${author.email}`,
                          text: "Contact via Email"
                        },
                        {
                          to: "#user-suspend",
                          onClick: () => alert("suspend"),
                          text: "Suspend user"
                        }
                      ]
                    }
                  })
                }
              />
            ))}
        </GridRow>
      ))}
    </GridContainer>
  ]
}
