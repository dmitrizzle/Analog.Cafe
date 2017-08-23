// tools
import React from "react"

// components
import { Article } from "../ArticleStyles"
import { Button } from "../Button"
import { ModalDispatch } from "../../containers/Modal"
import Composer from "../../containers/Composer"

import { ROUTE_SUBMISSION_API } from "../../../constants/submission"

var requestData = {
	raw: "",
	title: "",
	subtitle: ""
}

// render
export default props => {
	var modalDispatch = null
	if(localStorage.getItem('token')){
		modalDispatch = (
			<ModalDispatch
				with={{
					request: {
						url: ROUTE_SUBMISSION_API,
						data: requestData,
						method: "POST",
						headers: { Authorization: "JWT " + localStorage.getItem('token') }
					}
				}}
				wrapperElement="div"
			>
				<Button red>Send Submission <span role="img" aria-label="Rocket">🚀</span></Button>
			</ModalDispatch>
		)
	}else{
		modalDispatch = (
			<ModalDispatch
				wrapperElement="div"
				with={{
					info: {
						title: "User are not sign in.",
						text: "Please sign in to submit your article.",
						buttons: [
							{ to: '/sign-in', text: 'Yes', red: true },
							{ to: '#', text: 'No' }
						]
					},
					id: "footnotes/analog-cafe-inclusive"
				}}
			>
				<Button red>Send Submission <span role="img" aria-label="Rocket">🚀</span></Button>
			</ModalDispatch>
		)
	}
	return (
		<Article>
			<Composer requestData={ requestData } />
			{ modalDispatch }
		</Article>
	)
}
