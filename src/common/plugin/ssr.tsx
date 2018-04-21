import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {SchemaLink} from 'apollo-link-schema'
import {HapiOptionsFunction} from 'apollo-server-hapi'
import {Plugin} from 'hapi'
import {createMemoryHistory} from 'history'
import React from 'react'
import {renderToStringWithData} from 'react-apollo'
import {renderToStaticMarkup} from 'react-dom/server'
import {RoutesMap, connectRoutes} from 'redux-first-router'
import {ServerStyleSheet} from 'styled-components'
import {createReducer} from '../../app/reducer'
import {Container} from '../components/container'
import {createStore} from '../store'

/** Hapi plugin options */
export interface Options {
  components: {
    page: React.ComponentType<Props>
    root: React.ComponentType
  }
  options: HapiOptionsFunction
  path: string
  routes: RoutesMap
}

/** Page component properties */
export interface Props {
  body: string
  states: {
    apollo: {}
    redux: {}
  }
  styles: string
}

/** Handler plugin */
export const plugin: Plugin<Options> = {
  name: 'app-handler',
  register(server, {options, path, routes, components}) {
    const {page: Page, root: Root} = components
    server.route({
      method: 'GET',
      path,
      async handler(request, h) {
        // Set up Redux
        const history = createMemoryHistory({
          initialEntries: [request.path],
        })
        const router = connectRoutes(history, routes)
        const sheet = new ServerStyleSheet()
        const store = createStore({
          enhancers: [router.enhancer],
          middlewares: [router.middleware],
          reducer: createReducer({location: router.reducer}),
        })

        // Check for redirect
        const {kind, pathname} = store.getState().location
        if(kind === 'redirect') {
          return h.redirect(pathname)
        }

        // Set up Apollo
        const client = new ApolloClient({
          // @ts-ignore: False mismatched type error
          link: new SchemaLink(await options(request)),
          cache: new InMemoryCache(),
          ssrMode: true,
        })

        // Render snapshot and construct response
        const body = await renderToStringWithData(sheet.collectStyles((
          <Container client={client} store={store}>
            <Root />
          </Container>
        )))
        return renderToStaticMarkup((
          <Page
            body={body}
            states={{apollo: client.extract(), redux: store.getState()}}
            styles={sheet.getStyleTags()}
          />
        ))
      },
    })
  },
}
