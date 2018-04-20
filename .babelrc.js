function generate(
  modules = false,
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
    '@babel/preset-typescript',
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: false,
      modules,
    }],
  ]

  return {plugins, presets}
}

module.exports = {
  generate,
  ...generate(),
}
