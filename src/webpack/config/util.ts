import {Configuration, addRules} from 'wcb'
import {NewLoader, NewUseRule} from 'webpack'
import {generate} from '../../../babel/generate'

/**
 * Modify babel-loader configuration to not transform modules for Webpack
 * @param configuration Existing configuration
 * @return Updated configuration
 */
export function fixBabel(configuration: Configuration) {
  const [rule, ...rules] = configuration.module.rules
  const [loader, ...loaders] = (rule as NewUseRule).use as NewLoader[]
  return addRules({
    ...configuration,
    module: {
      ...configuration.module,
      rules: [],
    },
  }, [
    {
      ...rule,
      use: [
        {
          ...loader,
          options: {
            ...loader.options,
            babelrc: false,
            ...generate(false),
          },
        },
        ...loaders,
      ],
    },
    ...rules,
  ])
}
