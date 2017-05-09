const {parsePostData} = require('../utils')

module.exports = function (router, {Restaurant}) {
  router
    .get('/restaurant/list', async function (ctx) {
      ctx.body = {}
    })
    .post('/restaurant', async function (ctx) {
      let params = {}
      let restaurant = {}

      await parsePostData(ctx)
        .then(res => Object.assign(params, res))

      await new Restaurant({
        name: params.name,
        description: params.description,
        dishes: [],
        rate: 0
      })
        .save()
        .then(res => {
          restaurant = res._doc
        })

      ctx.body = {
        message: 'Add restaurant success!',
        result: restaurant
      }
    })
    .get('/restaurant/:id', async function () {

    })
    .put('/restaurant/:id', async function () {

    })
    .delete('/restaurant/:id', async function () {

    })
}