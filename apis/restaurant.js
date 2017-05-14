const {parsePostData, removeUselessProperties, notFoundErrorHandler} = require('../utils')

module.exports = function (router, {Restaurant}) {
  router
    .get('/restaurant/list', async function (ctx) {
      let
        restaurants = []

      await Restaurant
        .find()
        .then(res => restaurants = res)

      ctx.body = {
        result: restaurants
      }
    })
    .post('/restaurant', async function (ctx) {
      let
        params = {},
        restaurant = {}

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
    .get('/restaurant/:id', async function (ctx) {
      let
        _id = ctx.params.id,
        restaurant = {},
        message = ''

      await Restaurant
        .findById(_id)
        .then(res => restaurant = res)
        .catch(() => message = notFoundErrorHandler(Restaurant.modelName, _id))

      ctx.body = {
        message,
        result: restaurant
      }
    })
    .put('/restaurant/:id', async function (ctx) {
      let
        _id = ctx.params.id,
        params = {},
        updateInfo = {},
        message = ''

      await parsePostData(ctx)
        .then(res => Object.assign(params, res))

      Object.assign(updateInfo, {
        name: params.name,
        description: params.description,
        dishes: params.dishes,
      })

      updateInfo = removeUselessProperties(updateInfo)

      await Restaurant
        .findByIdAndUpdate(_id, updateInfo)
        .then(res => message = res ? 'Update user success!' : 'Update user failed')
        .catch(() => message = notFoundErrorHandler(Restaurant.modelName, _id))

      ctx.body = {
        message,
        result: updateInfo
      }
    })
    .delete('/restaurant/:id', async function (ctx) {
      let message = ''
      let _id = ctx.params.id

      await Restaurant
        .findByIdAndRemove(_id)
        .then(res => {
          message = res ? `Delete user ${_id} success!` : `User ${_id} has already deleted`
        })
        .catch(() => message = notFoundErrorHandler(Restaurant.modelName, _id))

      ctx.body = {
        message
      }
    })
}