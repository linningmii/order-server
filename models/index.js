const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const db = mongoose.connect('mongodb://localhost/orderDB')

module.exports = {
  db,
  User: require('./User')(db),
  Restaurant: require('./Restaurant')(db),
  Dish: require('./Dish')(db)
}