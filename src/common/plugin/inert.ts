import {Plugin} from 'hapi'
import * as inert from 'inert'
import {resolve} from '../path'

/** Inert plugin */
export const plugin: Plugin<{}> = {
  name: 'common-insert',
  async register(server) {
    await server.register(inert)
    server.route({
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: resolve('dist/assets'),
        },
      },
    })
  },
}
