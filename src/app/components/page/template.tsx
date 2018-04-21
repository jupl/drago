import React from 'react'
import serialize from 'serialize-javascript'
import {Props} from '../../../common/plugin/ssr'
export {Props} from '../../../common/plugin/ssr'

/**
 * Render top level page
 * @param props Component properties
 * @return Application page component
 */
export function AppPage({body, states, styles}: Props) {
  const scriptBody = [
    '',
    `window.__APOLLO_STATE__=(${serialize(states.apollo, {isJSON: true})})`,
    `window.__REDUX_STATE__=(${serialize(states.redux, {isJSON: true})})`,
    '',
  ].join(';')
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="initial-scale=1.0" />
        <title>App</title>
        {styles}
      </head>
      <body>
        <div id="container" dangerouslySetInnerHTML={{__html: body}} />
        <script dangerouslySetInnerHTML={{__html: scriptBody}} />
        <script src="/assets/app.js" />
      </body>
    </html>
  )
}
