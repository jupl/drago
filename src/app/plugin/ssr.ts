import {Options} from '../../common/plugin/ssr'
import {AppPage} from '../components/page'
import {AppRoot} from '../components/root'
import {routes} from '../routes'
import * as gql from './graphql'

// Plugin
export {plugin} from '../../common/plugin/ssr'

/** Options for plugin */
export const options: Options = {
  options: gql.options.graphqlOptions,
  path: '/{path*}',
  routes,
  components: {
    page: AppPage,
    root: AppRoot,
  },
}
