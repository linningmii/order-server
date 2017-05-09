module.exports = db => {
  return db.model(
    'User',
    db.Schema({
      username: String,
      password: String,
      isAdmin: Boolean,
      date: Array
    }))
}