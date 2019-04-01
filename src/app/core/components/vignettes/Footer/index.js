import React from "react"
import styled from "styled-components"

import { LabelWithSearchSVG } from "../../controls/Nav/components/NavGeneral"
import ArticleSection from "../../pages/Article/components/ArticleSection"
import Link from "../../controls/Link"
import Modal from "../../controls/Modal"
import Point from "../../icons/group-beacons/Point"
import Search from "../../icons/Search"

const SearchSvgWrap = styled(LabelWithSearchSVG)`
  a {
    padding: 0.5em;
  }
`
const Wrapper = styled(ArticleSection)`
  text-align: center;
  max-width: 100%;
  padding: 1em;
  a {
    :active {
      background: transparent !important;
    }
    svg path {
      stroke: ${props => props.theme.color.brand()} !important;
      fill: ${props => props.theme.color.brand()} !important;
    }
  }
`
export default () => (
  <Wrapper>
    <small>
      <SearchSvgWrap>
        <Modal
          unmarked
          element="a"
          with={{
            info: {
              search: true,
              menu: false,
              socialButtons: true,
              title: (
                <LabelWithSearchSVG>
                  <Search /> Find
                </LabelWithSearchSVG>
              )
            },
            id: "nav/find"
          }}
        >
          <Search />
        </Modal>
      </SearchSvgWrap>
      <Link
        to="#top"
        onClick={event => {
          event.preventDefault()
          window.scroll({
            top: 0,
            behavior: "smooth"
          })
        }}
      >
        <Point style={{ height: "1.25em", marginTop: "-.25em" }} />
      </Link>
    </small>
  </Wrapper>
)
