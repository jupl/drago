import {addRules, createConfiguration} from 'wcb'
import {fixBabel} from './util'

/** Webpack configuration */
export let configuration = addRules(fixBabel(createConfiguration({
  assets: process.env.STORYBOOK !== 'true' ? 'src/assets' : undefined,
  common: true,
  destination: 'dist/assets',
  log: message => console.log(`[client] ${message}`),
  source: 'src/assets',
  useBabel: true,
})), [
  {test: /\.(gif|jpg|jpeg|png|svg)$/, use: ['file-loader']},
])
configuration = {
  ...configuration,
  output: {...configuration.output, publicPath: '/assets/'}
}
