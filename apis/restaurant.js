const {parsePostData} = require('../utils')

module.exports = function (router, db) {
  const Restaurant = db.model('Restaurant', {
    name: String,
    description: String,
    dishes: Array,
    rate: Number
  })

  router
    .get('/restaurant/list', async function (ctx) {
      ctx.body = {}
    })
    .post('/restaurant', async function (ctx) {
      let restaurant = {}

      await parsePostData(ctx)
        .then(res => Object.assign(restaurant, res))

      await new Restaurant(restaurant)
        .save()

      ctx.body = {
        message: 'Add restaurant success!',
        restaurant
      }
    })
    .get('/restaurant/:id', async function () {

    })
    .put('/restaurant/:id', async function () {

    })
    .delete('/restaurant/:id', async function () {

    })
}