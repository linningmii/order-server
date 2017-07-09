const {removeUselessProperties, notFoundErrorHandler, lodash} = require('../utils')
const bodyParser = require('koa-body')();

module.exports = function (router, {User}) {
  router
    .get('/user/list', async function (ctx) {
      let users = []

      await User
        .find()
        .then(resp => users = resp.map(user => ({
            id: user._id,
            username: user.username,
            name: user.name,
            sex: user.sex
          }))
        )

      ctx.body = {
        result: users.reverse()
      }
    })
    .post('/user', bodyParser, async function (ctx) {
      let user = {}

      await new User({
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
        sex: ctx.request.body.sex
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
    .post('/user/login', bodyParser, async function (ctx) {
      let user
      let message

      await User.findOne({
        username: ctx.request.body.username,
        password: ctx.request.body.password
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
        result: {
          id: user._id,
          username: user.username,
          name: user.name,
          sex: user.sex,
          date: user.date
        }
      }
    })
    .put('/user/:id', bodyParser, async function (ctx) {
      let
        updateInfo,
        message = '',
        _id = ctx.params.id

      updateInfo = {
        password: ctx.request.body.password,
        name: ctx.request.body.name,
        sex: ctx.request.body.sex
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
    .patch('/user/:id', bodyParser, async function (ctx) {
      let message = ''
      let _id = ctx.params.id

      let date = lodash.uniq(ctx.request.body.date)

      await User
        .findByIdAndUpdate(_id, {date})
        .then(res => {
          message = res ? 'Update user success!' : 'Update user failed'
        })
        .catch(() => message = notFoundErrorHandler(User.modelName, _id))

      ctx.body = {
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