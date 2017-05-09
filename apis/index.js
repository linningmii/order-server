const user = require('./user')
const date = require('./date')
const restaurant = require('./restaurant')
const dish = require('./dish')
const models = require('../models')

module.exports = function (router) {
  user(router, models)
  date(router, models)
  restaurant(router, models)
  dish(router, models)
}