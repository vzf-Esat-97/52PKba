'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_BASE_URL: '"http://api.52kp8.com:32580"',
  NODE_ENV: '"development"',
  TITLE_APPEND: '"DEV ON PROD"'
})
