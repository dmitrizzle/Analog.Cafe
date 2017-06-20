// tools
import React from "react"

// components
import HeaderEditor from "./components/HeaderEditor"
import ContentEditor from "./components/ContentEditor"
import { Composer } from "../../components/Views/Submit"


// placeholders
const authorPlaceholder = {
	name: "Your Name",
	id:		"sample",
}
const titlePlaceholder = {
	title: "Write Your Title Here",
	subtitle: "Subtitle (Optional)",
}

// return
export default props => {
	return(
		<Composer
      header={
        <HeaderEditor
  				author={ authorPlaceholder }
  				pageTitle={ titlePlaceholder.title }
  				pageSubtitle={ titlePlaceholder.subtitle }
  			/>
      }
    >
			<ContentEditor author={ authorPlaceholder } />
		</Composer>
	)
}
