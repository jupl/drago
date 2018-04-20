import {addPlugins, addToEntries, createConfiguration} from 'wcb'
import {BannerPlugin} from 'webpack'
import {fixBabel} from './util'

/** Webpack configuration to build server */
export let configuration = addPlugins(fixBabel(createConfiguration({
  destination: 'dist/bin',
  log: message => console.log(`[server] ${message}`),
  source: 'src/bin',
  target: 'node',
  useBabel: true,
})), [
  new BannerPlugin({
    banner: '#!/usr/bin/env node',
    entryOnly: true,
    raw: true,
  }),
])
configuration = addToEntries(configuration, ['dotenv/config'])
