module.exports = db => {
  return db.model(
    'Dish',
    db.Schema({
      restaurantId: String,
      name: String,
      description: String,
      rate: Number
    }))
}