import {HapiPluginOptions} from 'apollo-server-hapi'
import {createOptionsFactory} from '../graphql'

// Plugin
export {graphqlHapi as plugin} from 'apollo-server-hapi'

const createOptions = createOptionsFactory({})

interface Options extends HapiPluginOptions {
  graphqlOptions: typeof createOptions
}

/** Options for plugin */
export const options: Options = {
  path: '/graphql',
  graphqlOptions: createOptions,
}
