const path = require('path')
const { override, addBabelPlugin, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src'),
  }),
  addBabelPlugin('@babel/plugin-proposal-optional-chaining')
)
