import {ApolloClient} from 'apollo-client'
import * as React from 'react'
import {Store} from 'redux'
import * as serialize from 'serialize-javascript'
import {ServerStyleSheet} from 'styled-components'

/** Component properties */
export interface Props {
  body: string
  client: ApolloClient<{}>
  sheet: ServerStyleSheet
  store: Store<{}>
}

/**
 * Render top level page
 * @param props Component properties
 * @return Application page component
 */
export function AppPage({body, client, sheet, store}: Props) {
  const scriptBody = [
    '',
    `window.__APOLLO_STATE__=${serialize(client.extract())}`,
    `window.__REDUX_STATE__=${serialize(store.getState())}`,
    '',
  ].join(';')
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="initial-scale=1.0" />
        <title>App</title>
        {sheet.getStyleElement()}
      </head>
      <body>
        <div id="container" dangerouslySetInnerHTML={{__html: body}} />
        <script dangerouslySetInnerHTML={{__html: scriptBody}} />
        <script src="app.js" />
      </body>
    </html>
  )
}
