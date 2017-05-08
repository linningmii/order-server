module.exports = function (router, db) {
  const Dish = db.model('Dish', {
    name: String,
    description: String,
    rate: Number
  })

  router
    .post('/dish', async function () {
      
    })
    .get('/dish', async function () {
      
    })
    .put('/dish', async function () {
      
    })
    .delete('/dish', async function () {
      
    })
}