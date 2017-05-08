const {parsePostData} = require('../utils')

module.exports = function (router, db) {
  const userSchema = db.Schema({
    name: String
  })

  const User = db.model('User',  userSchema)

  router
    .get('/user/list', async function (ctx) {
      let users = []

      await User.find()
        .then(resp => users = resp)

      ctx.body = {
        users
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
        name: params.name
      })
        .save()
        .then(resp => {
          user = resp
        })

      ctx.body = {
        message: 'Create user success!',
        user: {
          _id: user._id,
          name: user.name
        }
      }
    })
    .get('/user/:id', async function (ctx) {
      let user, err
      await User.findById(ctx.params.id)
        .then(res => user = res)
        .catch(e => err = e)

      if (err) {
        ctx.body = {
          message: 'User not found'
        }

        return
      }

      ctx.body = {
        user
      }
    })
    .put('/user/:id', function (ctx) {
      ctx.body = {
        message: 'Update user success!'
      }
    })
    .delete('/user/:id', async function (ctx) {
      await User.deleteOne({
        _id: ctx.params.id
      })
        .then()
        .catch()

      ctx.body = {
        message: 'Delete user success!'
      }
    })

}