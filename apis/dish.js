const {parsePostData} = require('../utils')

module.exports = function (router, db) {
  const dishSchema = db.Schema({
    restaurantId: String,
    name: String,
    description: String,
    rate: Number
  })

  const Dish = db.model('Dish', dishSchema)

  router
    .post('/dish', async function (ctx) {
      let params = {}
      let dish = {}

      await parsePostData(ctx)
        .then(res => Object.assign(params, res))

      await new Dish({
        name: params.name,
        description: params.description,
        rate: 0
      })
        .save()
        .then(
          res => {
            dish = res._doc
          })

      ctx.body = {
        message: 'Create dish success!',
        result: dish
      }
    })
    .get('/dish', async function (ctx) {

    })
    .put('/dish', async function () {

    })
    .delete('/dish', async function () {

    })
}