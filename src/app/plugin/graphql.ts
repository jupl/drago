import {HapiPluginOptions} from 'apollo-server-hapi'
import {createOptionsFactory} from '../graphql'

// Plugin
export {graphqlHapi as plugin} from 'apollo-server-hapi'

/** Options for plugin */
export const options: HapiPluginOptions = {
  path: '/graphql',
  graphqlOptions: createOptionsFactory({}),
}
