const user = require('./user')
const restaurant = require('./restaurant')
const dish = require('./dish')
const count = require('./count')
const models = require('../models')

module.exports = function (router) {
  user(router, models)
  restaurant(router, models)
  dish(router, models)
  count(router, models)
}