const {parsePostData, notFoundErrorHandler, removeUselessProperties} = require('../utils')

module.exports = function (router, {Dish}) {
  router
    .get('dist/list', async function (ctx) {
      let
        dishes = []

      await Dish
        .find()
        .then(res => dishes = res)

      ctx.body = {
        result: dishes
      }
    })
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
    .get('/dish/:id', async function (ctx) {
      let
        _id = ctx.params.id,
        restaurant = {},
        message = ''

      await Dish
        .findById(_id)
        .then(res => restaurant = res)
        .catch(() => message = notFoundErrorHandler(Dish.modelName, _id))

      ctx.body = {
        message,
        result: restaurant
      }
    })
    .put('/dish', async function (ctx) {
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

      await Dish
        .findByIdAndUpdate(_id, updateInfo)
        .then(res => message = res ? 'Update user success!' : 'Update user failed')
        .catch(() => message = notFoundErrorHandler(Dish.modelName, _id))

      ctx.body = {
        message,
        result: updateInfo
      }
    })
    .delete('/dish', async function (ctx) {
      let message = ''
      let _id = ctx.params.id

      await Dish
        .findByIdAndRemove(_id)
        .then(res => {
          message = res ? `Delete user ${_id} success!` : `User ${_id} has already deleted`
        })
        .catch(() => message = notFoundErrorHandler(Dish.modelName, _id))

      ctx.body = {
        message
      }
    })
}