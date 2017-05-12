const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const db = mongoose.connect('mongodb://localhost/orderDB')

module.exports = {
  db,
  User: require('./user')(db),
  Restaurant: require('./restaurant')(db),
  Dish: require('./dish')(db)
}