module.exports = db => {
  return db.model(
    'Restaurant',
    db.Schema({
      name: String,
      description: String,
      dishes: Array,
      rate: Number
    }))
}