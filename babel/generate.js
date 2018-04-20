exports.generate = function generate(
  modules = true,
  production = process.env.NODE_ENV === 'production',
) {
  let plugins = [
    ['babel-plugin-styled-components', {ssr: true, displayName: !production}],
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
  ]
  if(production) {
    plugins = [
      ...plugins,
      '@babel/plugin-transform-react-inline-elements',
    ]
  }

  const presets = [
    ['@babel/preset-env', {
      useBuiltIns: false,
      modules: modules ? 'commonjs' : false,
      shippedProposals: true,
    }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ]

  return {plugins, presets}
}
