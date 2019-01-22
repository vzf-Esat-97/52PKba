'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_BASE_URL: '"http://172.16.0.116:22580"',
  NODE_ENV: '"development"',
  TITLE_APPEND: '"DEV ON QA"'
})
