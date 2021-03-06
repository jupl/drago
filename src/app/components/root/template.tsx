import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import {normalize} from 'styled-normalize'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize}
`

// Container component
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(white, gainsboro);
`

/**
 * Render root component representing the entire application
 * @return Root component
 */
export function AppRoot() {
  return <Container>Hello, World</Container>
}
