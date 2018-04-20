import {addPlugins, addToEntries, createConfiguration} from 'wcb'
import {BannerPlugin} from 'webpack'

/** Webpack configuration to build server */
export const configuration = addToEntries(addPlugins(createConfiguration({
  destination: 'dist/bin',
  log: message => console.log(`[server] ${message}`),
  source: 'src/bin',
  target: 'node',
  useBabel: true,
}), [
  new BannerPlugin({
    banner: '#!/usr/bin/env node',
    entryOnly: true,
    raw: true,
  }),
]), ['dotenv/config'])
