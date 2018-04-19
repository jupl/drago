import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {SchemaLink} from 'apollo-link-schema'
import {Plugin} from 'hapi'
import * as React from 'react'
import {renderToStringWithData} from 'react-apollo'
import * as ReactDOM from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import {createReducer} from '../../app/reducer'
import {Container} from '../../common/components/container'
import {createStore} from '../../common/store'
import {AppPage} from '../components/page'
import {AppRoot} from '../components/root'
import {options} from './graphql'

/** Handler plugin */
export const plugin: Plugin<{}> = {
  name: 'app-handler',
  register(server) {
    server.route({
      method: 'GET',
      path: '/{path*}',
      async handler(request) {
        const client = new ApolloClient({
          // @ts-ignore: False mismatched type error
          link: new SchemaLink(options.graphqlOptions(request)),
          cache: new InMemoryCache(),
          ssrMode: true,
        })
        const sheet = new ServerStyleSheet()
        const store = createStore({reducer: createReducer()})
        const body = await renderToStringWithData(sheet.collectStyles((
          <Container client={client} store={store}>
            <AppRoot />
          </Container>
        )))
        return ReactDOM.renderToStaticMarkup((
          <AppPage body={body} client={client} sheet={sheet} store={store} />
        ))
      },
    })
  },
}
