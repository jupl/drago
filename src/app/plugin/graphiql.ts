import {HapiGraphiQLPluginOptions} from 'apollo-server-hapi'
import * as gql from './graphql'

// Plugin
export {graphiqlHapi as plugin} from 'apollo-server-hapi'

/** Options for plugin */
export const options: HapiGraphiQLPluginOptions = {
  path: '/graphiql',
  graphiqlOptions: {
    endpointURL: gql.options.path,
  },
}
