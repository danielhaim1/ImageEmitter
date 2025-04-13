module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  ignore: ['node_modules'],
  include: [
    './src/**/**.js',
    './index.js',
  ],
  plugins: [
    '@babel/plugin-transform-object-rest-spread',
    '@babel/plugin-transform-class-properties'
  ],
  sourceMaps: false,
};