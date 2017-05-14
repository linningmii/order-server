const {parsePostData, removeUselessProperties, notFoundErrorHandler} = require('../utils')

module.exports = function (router, {User}) {
  router
    .get('/user/list', async function (ctx) {
      let users = []

      await User
        .find()
        .then(resp => users = resp)

      ctx.body = {
        result: users
      }
    })
    .post('/user', async function (ctx) {
      let params = {}
      let user = {}

      await parsePostData(ctx)
        .then(res => {
          Object.assign(params, res)
        })

      await new User({
        username: params.username,
        password: params.password,
        name: params.name,
        sex: params.sex
      })
        .save()
        .then(res => {
          user = res._doc
        })

      ctx.body = {
        message: 'Create user success!',
        result: user
      }
    })
    .post('/user/login', async function (ctx) {
      let params = {}
      let user
      let message

      await parsePostData(ctx)
        .then(res => {
          Object.assign(params, res)
        })

      await User.findOne({
        username: params.username,
        password: params.password
      })
        .then(res => user = res)

      message = user ? 'Login success!' : 'Login failure'

      if (user) {
        ctx.body = {
          message,
          result: user
        }
      } else {
        ctx.body = {
          message
        }
      }
    })
    .get('/user/:id', async function (ctx) {
      let user, _id = ctx.params.id, message
      await User
        .findById(_id)
        .then(res => user = res)
        .catch()

      message = user ? null : notFoundErrorHandler(User.modelName, _id)
      ctx.body = {
        message: message,
        result: user
      }
    })
    .put('/user/:id', async function (ctx) {
      let
        params = {},
        updateInfo,
        message = '',
        _id = ctx.params.id

      parsePostData(ctx)
        .then(res => Object.assign(params, res))

      updateInfo = {
        password: params.password,
        name: params.name,
        sex: params.sex
      }

      updateInfo = removeUselessProperties(updateInfo)

      await User
        .findByIdAndUpdate(_id, updateInfo)
        .then(res => message = res ? 'Update user success!' : 'Update user failed')
        .catch(() => message = notFoundErrorHandler(User.modelName, _id))

      ctx.body = {
        result: updateInfo,
        message
      }
    })
    .delete('/user/:id', async function (ctx) {
      let message = ''
      let _id = ctx.params.id

      await User
        .findByIdAndRemove(_id)
        .then(res => {
          message = res ? `Delete user ${_id} success!` : `User ${_id} has already deleted`
        })
        .catch(() => message = notFoundErrorHandler(User.modelName, _id))

      ctx.body = {
        message
      }
    })

}