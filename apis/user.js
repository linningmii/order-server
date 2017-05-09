const {parsePostData} = require('../utils')

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
        password: params.password
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

      console.log(params)
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
      let user, err
      await User
        .findById(ctx.params.id)
        .then(res => user = res)
        .catch(e => err = e)

      if (err) {
        ctx.body = {
          message: 'User not found'
        }

        return
      }

      ctx.body = {
        result: user
      }
    })
    .put('/user/:id', function (ctx) {
      ctx.body = {
        message: 'Update user success!'
      }
    })
    .delete('/user/:id', async function (ctx) {
      let message = ''
      let _id = ctx.params.id

      await User
        .deleteOne({_id})
        .then(resp => {
          message = resp.result.n ? `Delete user ${_id} success!` : `Can not find user ${_id}!`
        })
        .catch(() => message = '服务器炸了')

      ctx.body = {
        message
      }
    })

}