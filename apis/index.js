const user = require('./user')
const date = require('./date')
const restaurant = require('./restaurant')
const dish = require('./dish')

module.exports = function (router, db) {
  user(router, db)
  date(router, db)
  restaurant(router, db)
  dish(router, db)
}