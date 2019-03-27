import React from "react"
import styled from "styled-components"

import { LabelWithSearchSVG } from "../../controls/Nav/components/NavGeneral"
import ArticleSection from "../../pages/Article/components/ArticleSection"
import Link from "../../controls/Link"
import Modal from "../../controls/Modal"
import Search from "../../icons/Search"

const SearchSvgWrap = styled(LabelWithSearchSVG)`
  a {
    padding: 0.5em;

    svg {
      path {
        stroke: ${props => props.theme.color.brand()} !important;
      }
    }
    :active {
      background: transparent !important;
      svg {
        path {
          stroke: ${props => props.theme.color.foreground()} !important;
        }
      }
    }
  }
`
const Wrapper = styled(ArticleSection)`
  text-align: center;
  max-width: 100%;
  padding: 1em;

  a {
    text-decoration: none;
    color: ${props => props.theme.color.brand()} !important;
    :active {
      color: ${props => props.theme.color.foreground()} !important;
      background: transparent !important;
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
        <span role="img" aria-label="Finger pointing up">
          ☝︎
        </span>
      </Link>
    </small>
  </Wrapper>
)
