module.exports = db => {
  return db.model(
    'User',
    db.Schema({
      username: String,
      password: String,
      name: String,
      sex: Number,
      isAdmin: Boolean,
      date: Array
    }))
}