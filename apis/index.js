const user = require('./user')

module.exports = function (router, db) {
  user(router, db)
}