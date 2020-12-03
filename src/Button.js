import React from 'react'
import styled, {css} from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 2px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 0;
  padding: 0.25em 1em;
  min-width: 20%;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`
export default Button